import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";

import { formatPrice } from "@/lib/format";
import { CourseProgress } from "@/components/course-progress";

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
    return (
        <Link href={`/courses/${id}`} className="block h-full">
            <div className="flex flex-col h-full bg-white dark:bg-gray-950 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 transition-all duration-500 hover:border-primary/40 hover:shadow-2xl">
                {/* Large Thumbnail */}
                <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                        fill
                        src={imageUrl}
                        alt={title}
                        className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Category overlay */}
                    <div className="absolute bottom-4 left-4">
                        <span className="px-4 py-2 bg-white/90 dark:bg-black/80 backdrop-blur-sm rounded-full text-sm font-semibold text-foreground">
                            {category}
                        </span>
                    </div>
                </div>

                {/* Spacious Content */}
                <div className="flex-1 p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                        {/* Title */}
                        <h3 className="text-2xl font-bold text-foreground line-clamp-3 leading-tight">
                            {title}
                        </h3>

                        {/* Chapters */}
                        <div className="flex items-center gap-3 text-muted-foreground">
                            <BookOpen className="h-5 w-5" />
                            <span className="text-base">
                                {chaptersLength} {chaptersLength === 1 ? "chapter" : "chapters"}
                            </span>
                        </div>
                    </div>

                    {/* Progress or Price */}
                    <div className="space-y-4">
                        {progress !== null ? (
                            <CourseProgress
                                value={progress}
                                size="lg"
                                variant={progress === 100 ? "success" : "default"}
                            />
                        ) : (
                            <div className="flex items-center justify-between">
                                <p className="text-3xl font-bold text-foreground">
                                    {formatPrice(price)}
                                </p>
                                {price === 0 && (
                                    <span className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full font-medium">
                                        Free
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