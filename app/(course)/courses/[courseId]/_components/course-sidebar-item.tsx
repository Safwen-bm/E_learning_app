"use client";

import { cn } from "@/lib/utils";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface CourseSidebarItemProps {
    label: string;
    id: string;
    isCompleted: boolean;
    courseId: string;
    isLocked: boolean;
};

export const CourseSidebarItem = ({
    label,
    id,
    isCompleted,
    courseId,
    isLocked,
}: CourseSidebarItemProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const Icon = isLocked ? Lock : (isCompleted ? CheckCircle : PlayCircle);
    const isActive = pathname?.includes(id);

    const onClick = () => {
        router.push(`/courses/${courseId}/chapters/${id}`);
    }

    return (
        <button
            onClick={onClick}
            type="button"
            className={cn(
                "flex items-center gap-x-2 text-muted-foreground text-sm font-medium pl-6 transition-colors hover:text-foreground hover:bg-accent/40",
                isActive && "text-foreground bg-accent hover:bg-accent hover:text-foreground",
                isCompleted && "text-[hsl(var(--success-foreground))] hover:text-[hsl(var(--success-foreground))]",
                isCompleted && isActive && "bg-[hsl(var(--success))]",
            )}
        >
            <div className="flex items-center gap-x-2 py-4">
                <Icon
                    size={20}
                    className={cn(
                        "text-muted-foreground",
                        isActive && "text-foreground",
                        isCompleted && "text-[hsl(var(--success-foreground))]",
                    )}
                />
                {label}
            </div>
            <div className={cn(
                "ml-auto opacity-0 border-2 border-[hsl(var(--ring))] h-full transition-all",
                isActive && "opacity-100",
                isCompleted && "border-[hsl(var(--success-foreground))]",
            )}
            />
        </button>
    )
}