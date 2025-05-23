"use client";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadButton } from "@/lib/uploadthing";
import toast from "react-hot-toast";

type Props = {
    endpoint: keyof typeof ourFileRouter
    onChange: (url?: string) => void
}

export default function FileUpload({ endpoint, onChange}: Props) {
  return (
    <main className="flex items-center justify-center h-60 bg-muted rounded-md">
      <UploadButton
  endpoint={endpoint}  
  onClientUploadComplete={(res) => {
    onChange(res?.[0].url);
  }}
  onUploadError={(error: Error) => {
    toast.error("Error uploading file");
  }}
/>

    </main>
  );
}
