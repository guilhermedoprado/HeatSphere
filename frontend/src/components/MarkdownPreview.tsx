// src/components/MarkdownPreview.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import "katex/dist/katex.min.css"; // importante para estilizar fórmulas
// se quiser, depois você pode copiar esse CSS local pra reduzir bundle. [web:16][web:22]

type Props = {
  content: string;
};

export function MarkdownPreview({ content }: Props) {
  return (
    <div className="markdown-preview">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
