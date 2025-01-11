import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

export async function POST(
    req: Request,
) {
    try {
        const { userId } = await auth();

        if (!userId || !isTeacher(userId)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { title } = body;

        // Validate input
        if (!title || typeof title !== "string" || title.trim() === "") {
            return new NextResponse("Invalid title", { status: 400 });
        }

        // Create course
        const course = await db.course.create({
            data: {
                userId,
                title: title.trim(),
            },
        });

        return NextResponse.json(course);
    } catch (error) {
        console.error("[COURSE_POST_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
