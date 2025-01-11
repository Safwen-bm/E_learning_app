import Mux from "@mux/mux-node";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

// Initialize Mux
const mux = new Mux({
    tokenId: process.env.MUX_TOKEN_ID!,
    tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

const { video } = mux; // Use lowercase 'video'

export async function DELETE(
    req: Request,
    { params }: { params: { courseId: string; chapterId: string } }
) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!params?.courseId || !params?.chapterId) {
            return new NextResponse("Invalid parameters", { status: 400 });
        }

        // Check ownership
        const ownCourse = await db.course.findUnique({
            where: { id: params.courseId, userId },
        });

        if (!ownCourse) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Find the chapter to delete
        const chapter = await db.chapter.findUnique({
            where: { id: params.chapterId, courseId: params.courseId },
        });

        if (!chapter) {
            return new NextResponse("Not Found", { status: 404 });
        }

        // Delete Mux asset if it exists
        if (chapter.videoUrl) {
            const existingMuxData = await db.muxData.findFirst({
                where: { chapterId: params.chapterId },
            });

            if (existingMuxData) {
                try {
                    await video.assets.delete(existingMuxData.assetId); // Corrected method
                    await db.muxData.delete({
                        where: { id: existingMuxData.id },
                    });
                } catch (muxError) {
                    console.error("Error deleting Mux asset:", muxError);
                    return new NextResponse("Error deleting video asset", { status: 500 });
                }
            }
        }

        // Delete the chapter
        const deletedChapter = await db.chapter.delete({
            where: { id: params.chapterId },
        });

        // Update course publishing status
        const isPublishedChaptersInCourse = await db.chapter.findMany({
            where: { courseId: params.courseId, isPublished: true },
        });

        if (!isPublishedChaptersInCourse.length) {
            await db.course.update({
                where: { id: params.courseId },
                data: { isPublished: false },
            });
        }

        return NextResponse.json(deletedChapter);
    } catch (error) {
        console.error("CHAPTER_ID_DELETE", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { courseId: string; chapterId: string } },
) {
    try {
        const { userId } = await auth();
        const { isPublished, ...values } = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!params?.courseId || !params?.chapterId) {
            return new NextResponse("Invalid parameters", { status: 400 });
        }

        // Check ownership
        const ownCourse = await db.course.findUnique({
            where: { id: params.courseId, userId },
        });

        if (!ownCourse) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Update chapter
        const chapter = await db.chapter.update({
            where: { id: params.chapterId, courseId: params.courseId },
            data: { ...values },
        });

        // If videoUrl is updated, delete old Mux asset and create a new one
        if (values.videoUrl) {
            const existingMuxData = await db.muxData.findFirst({
                where: { chapterId: params.chapterId },
            });

            if (existingMuxData) {
                try {
                    await video.assets.delete(existingMuxData.assetId); // Corrected method
                    await db.muxData.delete({
                        where: { id: existingMuxData.id },
                    });
                } catch (muxError) {
                    console.error("Error deleting Mux asset:", muxError);
                    return new NextResponse("Error deleting video asset", { status: 500 });
                }
            }

            // Create new Mux asset
            const asset = await video.assets.create({
                input: values.videoUrl,
                playback_policy: ["public"], // Use an array
                test: false,
            });

            await db.muxData.create({
                data: {
                    chapterId: params.chapterId,
                    assetId: asset.id,
                    playbackId: asset.playback_ids?.[0]?.id,
                },
            });
        }

        return NextResponse.json(chapter);
    } catch (error) {
        console.error("[COURSES_CHAPTER_ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
