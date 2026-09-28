"use client";

import * as z from "zod";
import axios from "axios";
import dynamic from "next/dynamic";
import { Video, Pencil, PlusCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "@prisma/client";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/file-upload";

const MuxPlayer = dynamic(() => import("@mux/mux-player-react"), {
  ssr: false,
});

interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
  assetStatus?: "preparing" | "ready" | "errored" | "missing" | null;
};

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

type StreamStatus = "ready" | "missing";

export const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
  assetStatus,
}: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  // Result of the last stream check, stored WITH the playback id it was
  // measured for, so it can never be applied to a different video.
  const [checked, setChecked] = useState<{
    id: string;
    status: StreamStatus;
  } | null>(null);

  const [isSaving, setIsSaving] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const playbackId = initialData?.muxData?.playbackId;

  // Mux told us the video failed or no longer exists: nothing to wait for.
  const assetFailed = assetStatus === "errored" || assetStatus === "missing";

  // No result for this exact id yet means "waiting", in the same render where
  // the id changes. The player only mounts on an id that has been checked.
  const streamStatus =
    checked && checked.id === playbackId ? checked.status : "waiting";

  useEffect(() => {
    if (!playbackId || assetFailed) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const check = async () => {
      const res = await fetch(`https://stream.mux.com/${playbackId}.m3u8`, {
        cache: "no-store",
      }).catch(() => null);

      if (cancelled) return;
      if (res?.ok) {
        setChecked({ id: playbackId, status: "ready" });
        return;
      }
      if (res?.status === 404) {
        setChecked({ id: playbackId, status: "missing" });
        return;
      }
      timer = setTimeout(check, 5000);
    };

    check();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [playbackId, assetFailed]);

  // The refreshed data arrived with the new video: leave edit mode.
  useEffect(() => {
    setIsEditing(false);
    setIsSaving(false);
  }, [initialData.videoUrl]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSaving(true);
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values,
      );
      // The old video was just replaced: forget its result so the old asset
      // is never played while the page reloads the new data.
      setChecked(null);
      toast.success("Chapter updated");
      // Edit mode ends by itself when the new data arrives (effect above).
      router.refresh();
    } catch (error) {
      console.error("Error updating chapter:", error);
      toast.error("Something went wrong!");
      setIsSaving(false);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter video
        <Button onClick={toggleEdit} variant="ghost" disabled={isSaving}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            {playbackId && !assetFailed && streamStatus === "ready" ? (
              <MuxPlayer playbackId={playbackId} />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-y-2 rounded-md bg-slate-200 px-4 text-center text-sm text-muted-foreground">
                {!playbackId || assetFailed || streamStatus === "missing" ? (
                  <>
                    <Video className="h-8 w-8" />
                    <p>
                      This video isn&apos;t available. Try uploading it again.
                    </p>
                  </>
                ) : (
                  <>
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <p>
                      Your video is being prepared. It will appear here
                      automatically.
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      {isEditing &&
        (isSaving ? (
          <div className="mt-2 flex h-40 flex-col items-center justify-center gap-y-2 rounded-md bg-slate-200 text-sm text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
            <p>Saving your video...</p>
          </div>
        ) : (
          <div>
            <FileUpload
              endpoint="courseVideo"
              onChange={(url) => {
                if (url) {
                  onSubmit({ videoUrl: url });
                }
              }}
            />
            <div className="text-xs text-muted-foreground mt-4">
              Upload this chapter&apos;s video
            </div>
          </div>
        ))}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos can take a few minutes to process. If you don&apos;t see your
          video, try refreshing the page.
        </div>
      )}
    </div>
  );
};
