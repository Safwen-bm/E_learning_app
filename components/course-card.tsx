import { SafeImage } from "@/components/safe-image";
import Link from "next/link";
import { BookOpen, CheckCircle2 } from "lucide-react";

import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface CourseCardProps {
    id: string;
    title: string;
    imageUrl: string;
    chaptersLength: number;
    price: number;
    progress: number | null;
    category: string;
}

export const CourseCard = ({
    id,
    title,
    imageUrl,
    chaptersLength,
    price,
    progress,
    category,
}: CourseCardProps) => {
    const chaptersLabel = `${chaptersLength} ${chaptersLength === 1 ? "chapter" : "chapters"}`;
    const isCompleted = progress === 100;

    return (
        <Link
            href={`/courses/${id}`}
            className="group block h-full rounded-xl ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
            <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors group-hover:border-foreground/30">
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-muted">
                    {imageUrl ? (
                        <SafeImage
                            fill
                            src={imageUrl}
                            alt={title}
                            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                            <BookOpen className="h-8 w-8" />
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-4">
                    <p className="text-xs font-medium text-muted-foreground">
                        {category}
                    </p>
                    <h3 className="mt-1 line-clamp-2 text-base font-semibold leading-snug text-foreground">
                        {title}
                    </h3>

                    <div className="mt-auto pt-4">
                        {progress !== null ? (
                            <div className="space-y-2">
                                <Progress
                                    value={progress}
                                    variant={isCompleted ? "success" : "default"}
                                    className="h-1.5"
                                />
                                <div className="flex items-center justify-between text-xs">
                                    <span
                                        className={cn(
                                            "flex items-center gap-1 font-medium",
                                            isCompleted
                                                ? "text-[hsl(var(--success-foreground))]"
                                                : "text-foreground"
                                        )}
                                    >
                                        {isCompleted ? (
                                            <>
                                                <CheckCircle2 className="h-3.5 w-3.5" />
                                                Completed
                                            </>
                                        ) : (
                                            `${Math.round(progress)}% complete`
                                        )}
                                    </span>
                                    <span className="text-muted-foreground">
                                        {chaptersLabel}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <BookOpen className="h-3.5 w-3.5" />
                                    {chaptersLabel}
                                </span>
                                {price === 0 ? (
                                    <span className="rounded-md bg-[hsl(var(--success))] px-2 py-0.5 text-xs font-medium text-[hsl(var(--success-foreground))]">
                                        Free
                                    </span>
                                ) : (
                                    <span className="text-base font-semibold text-foreground">
                                        {formatPrice(price)}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};