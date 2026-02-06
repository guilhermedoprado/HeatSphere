import React from "react";
import MDEditor from "@uiw/react-md-editor";

type Props = {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
};

export function MarkdownEditor({ value, onChange, readOnly }: Props) {
  return (
    <div data-color-mode="light">
      <MDEditor
        value={value}
        onChange={(val) => onChange(val || "")}
        preview={readOnly ? "preview" : "live"}
        hideToolbar={!!readOnly}
      />
    </div>
  );
}