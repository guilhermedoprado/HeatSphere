/**
 * Remark plugin that transforms [[wiki links]] in Markdown into
 * special `wikiLink` MDAST nodes so they can be rendered by rehype / React.
 *
 * Syntax:
 *   [[Page Title]]          → links to the note titled "Page Title"
 *   [[Page Title|alias]]    → displays "alias" but links to "Page Title"
 *
 * Handles the case where $math$ inside [[...]] causes the parser
 * to split the brackets across multiple sibling nodes (text + inlineMath).
 */
import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Root, Text, PhrasingContent, Parent } from "mdast";

// ── MDAST node type ────────────────────────────────────────────
export interface WikiLinkNode {
  type: "wikiLink";
  data: {
    hName: string;
    hProperties: { className: string; "data-wiki-target": string };
  };
  children: PhrasingContent[];
}

const WIKI_LINK_RE = /\[\[([^\]]+?)\]\]/g;

/** Extract plain-text representation from a node (recursively). */
function nodeText(node: PhrasingContent): string {
  if (node.type === "text") return (node as Text).value;
  if (node.type === "inlineMath") return "$" + (node as unknown as { value: string }).value + "$";
  if ("children" in node) return ((node as Parent).children as PhrasingContent[]).map(nodeText).join("");
  return "";
}

/**
 * Build a wikiLink node from an extracted target string and display children.
 */
function makeWikiLink(target: string, displayChildren: PhrasingContent[]): WikiLinkNode {
  const parts = target.split("|");
  const actualTarget = parts[0].trim();
  const alias = parts.length > 1 ? parts[1].trim() : null;

  return {
    type: "wikiLink",
    data: {
      hName: "span",
      hProperties: {
        className: "wiki-link",
        "data-wiki-target": actualTarget,
      },
    },
    children: alias
      ? [{ type: "text", value: alias }]
      : displayChildren,
  } as WikiLinkNode;
}

const remarkWikiLink: Plugin<[], Root> = () => {
  return (tree: Root) => {
    // Pass 1: Handle single text-node [[...]] (the simple case)
    visit(tree, "text", (node: Text, index, parent) => {
      if (!parent || index === undefined) return;

      const value = node.value;
      if (!WIKI_LINK_RE.test(value)) return;
      WIKI_LINK_RE.lastIndex = 0;

      const children: (Text | WikiLinkNode)[] = [];
      let lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = WIKI_LINK_RE.exec(value)) !== null) {
        if (match.index > lastIndex) {
          children.push({ type: "text", value: value.slice(lastIndex, match.index) });
        }

        const raw = match[1];
        const parts = raw.split("|");
        const target = parts[0].trim();
        const display = (parts[1] ?? parts[0]).trim();

        children.push(makeWikiLink(target, [{ type: "text", value: display }]));
        lastIndex = match.index + match[0].length;
      }

      if (lastIndex < value.length) {
        children.push({ type: "text", value: value.slice(lastIndex) });
      }

      parent.children.splice(index, 1, ...(children as PhrasingContent[]));
    });

    // Pass 2: Handle multi-node [[...$math$...]] across siblings
    // When remarkMath tokenizes $...$ inside [[...]], the brackets end up
    // in separate text nodes with inlineMath nodes in between.
    visit(tree, (_node, _index, _parent) => {
      if (!_parent || !("children" in _parent)) return;
      const parent = _parent as Parent;
      const kids = parent.children as PhrasingContent[];

      let modified = false;
      let i = 0;

      while (i < kids.length) {
        const child = kids[i];

        // Look for a text node ending with [[  (possibly with text before)
        if (child.type === "text") {
          const text = (child as Text).value;
          const openIdx = text.lastIndexOf("[[");

          if (openIdx !== -1) {
            // Check if the [[ is already closed within this node — skip (handled in Pass 1)
            const afterOpen = text.slice(openIdx + 2);
            if (afterOpen.includes("]]")) {
              i++;
              continue;
            }

            // Look forward for a text node containing ]]
            let closeNodeIdx = -1;
            let closeCharIdx = -1;

            for (let j = i + 1; j < kids.length; j++) {
              if (kids[j].type === "text") {
                const t = (kids[j] as Text).value;
                const ci = t.indexOf("]]");
                if (ci !== -1) {
                  closeNodeIdx = j;
                  closeCharIdx = ci;
                  break;
                }
              }
            }

            if (closeNodeIdx !== -1) {
              // Collect all inner nodes between [[ and ]]
              const innerNodes: PhrasingContent[] = [];

              // Text after [[ in the opening node
              if (afterOpen.length > 0) {
                innerNodes.push({ type: "text", value: afterOpen });
              }

              // Nodes between opening and closing nodes
              for (let j = i + 1; j < closeNodeIdx; j++) {
                innerNodes.push(kids[j]);
              }

              // Text before ]] in the closing node
              const closeText = (kids[closeNodeIdx] as Text).value;
              if (closeCharIdx > 0) {
                innerNodes.push({ type: "text", value: closeText.slice(0, closeCharIdx) });
              }

              // Build target from concatenated text of inner nodes
              const target = innerNodes.map(nodeText).join("");

              // Build the wiki link
              const wikiLink = makeWikiLink(target, [...innerNodes]);

              // Assemble replacement nodes
              const replacements: PhrasingContent[] = [];

              // Text before [[ in the opening node
              if (openIdx > 0) {
                replacements.push({ type: "text", value: text.slice(0, openIdx) });
              }

              replacements.push(wikiLink as unknown as PhrasingContent);

              // Text after ]] in the closing node
              const afterClose = closeText.slice(closeCharIdx + 2);
              if (afterClose.length > 0) {
                replacements.push({ type: "text", value: afterClose });
              }

              // Replace nodes from i to closeNodeIdx (inclusive) with replacements
              kids.splice(i, closeNodeIdx - i + 1, ...replacements);
              modified = true;
              continue; // re-check from same index
            }
          }
        }

        i++;
      }

      if (modified) {
        parent.children = kids;
      }
    });
  };
};

export default remarkWikiLink;
