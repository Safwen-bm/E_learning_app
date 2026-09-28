"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";

// Dynamically import Tiptap without SSR
const EditorContent = dynamic(() => import('@tiptap/react').then((mod) => mod.EditorContent), { ssr: false });

interface PreviewProps {
  value: string;
}

const Preview = ({ value }: PreviewProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    editable: false,
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return <EditorContent editor={editor} />;
};

export default Preview;