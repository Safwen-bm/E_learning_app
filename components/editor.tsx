"use client";

import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
}

const Editor = ({ onChange, value }: EditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());  // Send updated HTML back to parent
    },
  });

  return (
    <div className="bg-white">
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
