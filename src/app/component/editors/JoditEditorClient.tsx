"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

interface JoditEditorClientProps {
  value: string;
  onChange: (html: string) => void;
}

export default function JoditEditorClient({ value, onChange }: JoditEditorClientProps) {
  const [content, setContent] = useState(value || "");

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      <JoditEditor
        value={content}
        config={{
          readonly: false,
          height: 350,
          placeholder: "Write your email body here...",
          uploader: { insertImageAsBase64URI: true },
        }}
        onBlur={(newContent) => {
          setContent(newContent);   // update local state
          onChange(newContent);     // notify parent
        }}
      />
    </div>
  );
}
