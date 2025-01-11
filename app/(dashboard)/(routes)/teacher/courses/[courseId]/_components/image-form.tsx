'use client';

import React from "react";
import * as z from "zod";
import { auth } from "@clerk/nextjs/server";
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import { Course } from "@prisma/client";
import { useRouter } from "next/navigation";
import FileUpload from "@/components/file-upload";
import { db } from "@/lib/db";

type Props = {
  initialData: Course
  courseId: string
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: 'Image is required'
  })
})

export const ImageForm = ({ 
  initialData, 
  courseId 
}: Props) => {

  const router = useRouter()
  const [isEditing, setIsEditing] = React.useState(false)
  const toggleEditing = () => setIsEditing((prev) => !prev)

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success('Course updated!');
      toggleEditing();
      router.refresh();
    } catch (error) {
      console.error("Error updating course:", error); 
      toast.error('Something went wrong during image upload!');
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Image
        <Button
          onClick={toggleEditing}
          variant="ghost"
        >
          {isEditing && <>Cancel</>}

          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Image
            </>
          )}

          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an Image
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        !initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              src={initialData.imageUrl}
              alt="Uploaded Image"
              fill
              className="object-cover rounded-md"
            />
          </div>
        ))}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url })
              }
            }}
          />
        </div>
      )}
    </div>
  )
}
