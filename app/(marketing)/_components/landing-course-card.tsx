import { SafeImage } from "@/components/safe-image";
import Link from "next/link";
import { BookOpen } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import type { LandingCourse } from "@/actions/get-landing-courses";

interface LandingCourseCardProps {
    course: LandingCourse;
    variant?: "light" | "dark";
}

export const LandingCourseCard = ({
    course,
    variant = "light",
}: LandingCourseCardProps) => {
    const isDark = variant === "dark";
    const isFree = !course.price;
    const muted = isDark ? "text-marketing-chalkDim" : "text-marketing-ink/60";

    return (
        <Link
            href={`/courses/${course.id}`}
            className={cn(
                "flex h-full flex-col overflow-hidden rounded-sm border transition-colors",
                isDark
                    ? "border-marketing-line bg-marketing-panel text-marketing-chalk hover:border-marketing-yellow"
                    : "border-marketing-ink/10 bg-white text-marketing-ink hover:border-marketing-mustardDeep"
            )}
        >
            <div
                className={cn(
                    "relative aspect-[3/2]",
                    isDark ? "bg-marketing-bgDeep" : "bg-marketing-chalk"
                )}
            >
                {course.imageUrl ? (
                    <SafeImage
                        fill
                        src={course.imageUrl}
                        alt={course.title}
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                        fallbackClassName={muted}
                    />
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <BookOpen className={cn("h-8 w-8", muted)} />
                    </div>
                )}
            </div>

            <div className="flex flex-1 flex-col p-4">
                <p className={cn("text-xs", muted)}>
                    {course.category ?? "Uncategorized"}
                </p>
                <h3 className="mt-1 line-clamp-2 font-display text-lg leading-snug">
                    {course.title}
                </h3>
                <p className={cn("mt-1 text-sm", muted)}>{course.instructorName}</p>

                <div className="mt-auto flex items-center justify-between pt-4">
                    <span className={cn("flex items-center gap-1 text-xs", muted)}>
                        <BookOpen className="h-3.5 w-3.5" />
                        {course.chaptersCount}{" "}
                        {course.chaptersCount === 1 ? "chapter" : "chapters"}
                    </span>
                    <span
                        className={cn(
                            "rounded-sm px-2 py-1 text-xs font-medium",
                            isFree
                                ? isDark
                                    ? "bg-marketing-yellow/15 text-marketing-yellow"
                                    : "bg-[#DDE9E1] text-[#1F4D3A]"
                                : isDark
                                    ? "bg-marketing-chalk text-marketing-bgDeep"
                                    : "bg-marketing-ink text-marketing-chalk"
                        )}
                    >
                        {isFree ? "Free" : formatPrice(course.price ?? 0)}
                    </span>
                </div>
            </div>
        </Link>
    );
};