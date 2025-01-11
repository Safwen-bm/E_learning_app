import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { courseId: string } }) {
    try {
      // Await the auth function to get the userId
      const { userId } = await auth();
  
      if (!userId) {
        return NextResponse.json("Unauthorized", { status: 401 });
      }
  
      // Retrieve the data from the request body
      const body = await req.json();
      const { list } = body;
  
      if (!Array.isArray(list)) {
        return NextResponse.json("Invalid data format", { status: 400 });
      }
  
      // Ensure params are available and valid
      const { courseId } = await params; // Await params here
  
      if (!courseId) {
        return NextResponse.json("Missing courseId", { status: 400 });
      }
  
      // Fetch the course using the courseId and userId to check ownership
      const course = await db.course.findUnique({
        where: { id: courseId, userId },
      });
  
      if (!course) {
        return NextResponse.json("Unauthorized", { status: 401 });
      }
  
      // Update chapter positions based on the provided list
      await Promise.all(
        list.map((item) =>
          db.chapter.update({
            where: { id: item.id },
            data: { position: item.position },
          })
        )
      );
  
      // Return success response
      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
      console.error("[REORDER ERROR]", error);
      return NextResponse.json("Internal Error", { status: 500 });
    }
  }