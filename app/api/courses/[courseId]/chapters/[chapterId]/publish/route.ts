import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
    try {
        const { courseId, chapterId } = await params;
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!courseId || !chapterId) {
            return new NextResponse("Invalid parameters", { status: 400 });
        }

        const ownCourse = await db.course.findUnique({
            where: {
                id: courseId,
                userId,
            },
        });

        if (!ownCourse) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const chapter = await db.chapter.findUnique({
            where: {
                id: chapterId,
                courseId: courseId,
            },
        });

        const muxData = await db.muxData.findUnique({
            where: {
                chapterId: chapterId,
            },
        });
             // || !chapter.videoUrl|| !chapter.description || !muxData
        if (!chapter || !chapter.title) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const publishedChapter = await db.chapter.update({
            where: {
                id: chapterId,
                courseId: courseId,
            },
            data: {
                isPublished: true,
            },
        });

        return NextResponse.json(publishedChapter);
    } catch (error) {
        console.error("[CHAPTER_PUBLISH_ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}