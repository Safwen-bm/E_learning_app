"use client";

import axios from "axios";
import dynamic from "next/dynamic";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock, VideoOff } from "lucide-react";

import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti-store";

const MuxPlayer = dynamic(() => import("@mux/mux-player-react"), { ssr: false });

interface VideoPlayerProps {
    playbackId: string;
    courseId: string;
    chapterId: string;
    nextChapterId?: string;
    isLocked: boolean;
    completeOnEnd: boolean;
    title: string;
};

export const VideoPlayer = ({
    playbackId,
    courseId,
    chapterId,
    nextChapterId,
    isLocked,
    completeOnEnd,
    title,
}: VideoPlayerProps) => {
    const [isReady, setIsReady] = useState(false);
    const [hasError, setHasError] = useState(false);
    const router = useRouter();
    const confetti = useConfettiStore();

    const onEnd = async () => {
        try {
            if (completeOnEnd) {
                await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
                    isCompleted: true,
                });

                if (!nextChapterId) {
                    confetti.onOpen();
                }

                toast.success("Progress updated");
                router.refresh();

                if (nextChapterId) {
                    router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
                }
            }

        } catch {
            toast.error("Something went wrong");
        }
    }

    const showPlaceholder = !playbackId || hasError;

    return (
        <div className="relative aspect-video">
            {!isReady && !isLocked && !showPlaceholder && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#16241F]">
                    <Loader2 className="h-8 w-8 animate-spin text-[#ECEFE9]" />
                </div>
            )}
            {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#16241F] flex-col gap-y-2 text-[#ECEFE9]">
                    <Lock className="h-8 w-8" />
                    <p className="text-sm">
                        This chapter is locked
                    </p>
                </div>
            )}
            {!isLocked && showPlaceholder && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#16241F] flex-col gap-y-2 text-[#ECEFE9]/70">
                    <VideoOff className="h-8 w-8" />
                    <p className="text-sm">
                        {playbackId ? "This video couldn't be loaded" : "No video uploaded for this chapter yet"}
                    </p>
                </div>
            )}
            {!isLocked && !showPlaceholder && (
                <MuxPlayer
                    title={title}
                    className={cn(
                        !isReady && "hidden"
                    )}
                    onCanPlay={() => setIsReady(true)}
                    onError={() => setHasError(true)}
                    onEnded={onEnd}
                    autoPlay
                    playbackId={playbackId}
                />
            )}
        </div>
    )
}