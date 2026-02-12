import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import katex from "katex";
import styles from "./WikiLink.module.css";

export type WikiNoteInfo = {
  id: string;
  title: string;
  briefDefinition: string;
};

/**
 * Render inline $...$ math in a string using KaTeX, returning HTML.
 * Non-math text is escaped. Multiple $...$ segments are supported.
 */
function renderInlineMath(text: string): string {
  return text.replace(/\$([^$]+)\$/g, (_match, tex: string) => {
    try {
      return katex.renderToString(tex, { throwOnError: false, displayMode: false });
    } catch {
      return tex;
    }
  });
}

/** Strips $...$ delimiters for plain-text comparison */
function normalizeTitle(t: string): string {
  return t.replace(/\$/g, "").trim().toLowerCase();
}

type Props = {
  target: string;
  children: React.ReactNode;
  notes: WikiNoteInfo[];
  onNavigate: (noteId: string) => void;
};

export function WikiLink({ target, children, notes, onNavigate }: Props) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const ref = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const matched = notes.find(
    (n) =>
      n.title.toLowerCase() === target.toLowerCase() ||
      normalizeTitle(n.title) === normalizeTitle(target)
  );

  // Pre-render KaTeX HTML for tooltip
  const tooltipTitleHtml = useMemo(
    () => renderInlineMath(matched?.title ?? target),
    [matched, target]
  );
  const tooltipDefHtml = useMemo(
    () => (matched?.briefDefinition ? renderInlineMath(matched.briefDefinition) : ""),
    [matched]
  );

  const handleMouseEnter = useCallback(() => {
    clearTimeout(timeoutRef.current);
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setTooltipPos({ top: rect.bottom + 4, left: rect.left });
    }
    setShowTooltip(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setShowTooltip(false), 200);
  }, []);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (matched) {
      onNavigate(matched.id);
    }
  };

  return (
    <>
      <span
        ref={ref}
        className={`${styles.wikiLink} ${matched ? styles.resolved : styles.unresolved}`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </span>
      {showTooltip && (
        <div
          className={styles.tooltip}
          style={{ top: tooltipPos.top, left: tooltipPos.left }}
          onMouseEnter={() => clearTimeout(timeoutRef.current)}
          onMouseLeave={handleMouseLeave}
        >
          {matched ? (
            <>
              <div
                className={styles.tooltipTitle}
                dangerouslySetInnerHTML={{ __html: tooltipTitleHtml }}
              />
              {tooltipDefHtml ? (
                <div
                  className={styles.tooltipDef}
                  dangerouslySetInnerHTML={{ __html: tooltipDefHtml }}
                />
              ) : (
                <div className={styles.tooltipEmpty}>No definition set</div>
              )}
              <div className={styles.tooltipHint}>Click to open</div>
            </>
          ) : (
            <>
              <div
                className={styles.tooltipTitle}
                dangerouslySetInnerHTML={{ __html: tooltipTitleHtml }}
              />
              <div className={styles.tooltipEmpty}>Note not found</div>
            </>
          )}
        </div>
      )}
    </>
  );
}
