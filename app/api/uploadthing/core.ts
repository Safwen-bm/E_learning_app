import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";


const f = createUploadthing();

const handleAuth = async () => {
  const { userId } = await auth();
  const isAuthorized = isTeacher(userId);

  if (!userId || !isAuthorized) throw new Error("User is not authenticated");
  return { userId };
}


export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })

    .middleware(() => handleAuth())
    .onUploadComplete(async () => { }),

  courseAttachment: f(["pdf", "image", "video", "audio", "text"])

    .middleware(() => handleAuth())
    .onUploadComplete(async () => { }),

  courseVideo: f({ video: { maxFileSize: "1GB", maxFileCount: 1 } })

    .middleware(() => handleAuth())
    .onUploadComplete(async () => { }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
