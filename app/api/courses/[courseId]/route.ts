import Mux from "@mux/mux-node";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

const { Video } = new Mux(
    process.env.MUX_TOKEN_ID!,
    process.env.MUX_TOKEN_SECRET!,
);

export async function DELETE(
    req: Request,
    { params }: { params: { courseId: string } }
) {
    try {
        const { userId } = await auth();

        if (!userId || !isTeacher(userId)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const course = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId,
            },
            include: {
                chapters: {
                    include: {
                        muxData: true,
                    },
                },
            },
        });

        if (!course) {
            return new NextResponse("Not found", { status: 404 });
        }

        for (const chapter of course.chapters) {
            if (chapter.muxData?.assetId) {
                await Video.assets.del(chapter.muxData.assetId); // Fixed capitalization
            }
        }

        const deletedCourse = await db.course.delete({
            where: {
                id: params.courseId,
            },
        });

        return NextResponse.json(deletedCourse);
    } catch (error) {
        console.error("[COURSE_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { courseId: string } }
) {
    try {
        const { userId } = await auth();
        const { courseId } = params;
        const values = await req.json();

        if (!userId || !isTeacher(userId)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Optional: Validate the `values` object here for security

        const course = await db.course.update({
            where: {
                id: courseId,
                userId,
            },
            data: {
                ...values,
            },
        });

        return NextResponse.json(course);
    } catch (error) {
        console.error("[COURSE_ID_PATCH]", error); // More specific error message
        return new NextResponse("Internal Error", { status: 500 });
    }
}
