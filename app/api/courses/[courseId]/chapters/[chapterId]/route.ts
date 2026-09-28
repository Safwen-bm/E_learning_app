import Mux from "@mux/mux-node";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

const mux = new Mux({
    tokenId: process.env.MUX_TOKEN_ID!,
    tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

const { video } = mux;

type RouteParams = {
    params: Promise<{
        courseId: string;
        chapterId: string;
    }>;
};

export async function DELETE(
    req: Request,
    { params }: RouteParams
) {
    try {
        const { userId } = await auth();
        const { courseId, chapterId } = await params;

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
                courseId,
            },
        });

        if (!chapter) {
            return new NextResponse("Not Found", { status: 404 });
        }

        const existingMuxData = await db.muxData.findFirst({
            where: {
                chapterId,
            },
        });

        if (existingMuxData) {
            try {
                await video.assets.delete(existingMuxData.assetId);
            } catch (muxError: any) {
                if (muxError?.statusCode !== 404 && muxError?.status !== 404) {
                    console.error("Error deleting Mux asset:", muxError);
                    return new NextResponse(
                        "Error deleting video asset",
                        { status: 500 }
                    );
                }
            }

            await db.muxData.delete({
                where: {
                    id: existingMuxData.id,
                },
            });
        }

        const deletedChapter = await db.chapter.delete({
            where: {
                id: chapterId,
            },
        });

        const publishedChapters = await db.chapter.findMany({
            where: {
                courseId,
                isPublished: true,
            },
        });

        if (!publishedChapters.length) {
            await db.course.update({
                where: {
                    id: courseId,
                },
                data: {
                    isPublished: false,
                },
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
    { params }: RouteParams
) {
    try {
        const { userId } = await auth();
        const { courseId, chapterId } = await params;

        const { isPublished, ...values } = await req.json();

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

        const chapter = await db.chapter.update({
            where: {
                id: chapterId,
                courseId,
            },
            data: {
                ...values,
                ...(isPublished !== undefined && { isPublished }),
            },
        });

        if (values.videoUrl) {
            const existingMuxData = await db.muxData.findFirst({
                where: {
                    chapterId,
                },
            });

            if (existingMuxData) {
                try {
                    await video.assets.delete(existingMuxData.assetId);
                } catch (muxError: any) {
                    if (
                        muxError?.statusCode !== 404 &&
                        muxError?.status !== 404
                    ) {
                        console.error(
                            "Error deleting Mux asset:",
                            muxError
                        );

                        return new NextResponse(
                            "Error deleting video asset",
                            { status: 500 }
                        );
                    }
                }

                await db.muxData.delete({
                    where: {
                        id: existingMuxData.id,
                    },
                });
            }

            const asset = await video.assets.create({
                input: values.videoUrl,
                playback_policy: ["public"],
                test: false,
            });

            await db.muxData.create({
                data: {
                    chapterId,
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