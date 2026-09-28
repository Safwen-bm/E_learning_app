import { Category, Course } from "@prisma/client";
import { BookOpen } from "lucide-react";

import { CourseCard } from "@/components/course-card";

type CourseWithProgressWithCategory = Course & {
    category: Category | null;
    chapters: { id: string }[];
    progress: number | null;
};

interface CoursesListProps {
    items: CourseWithProgressWithCategory[];
};

export const CoursesList = ({ items }: CoursesListProps) => {
    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="rounded-full bg-muted p-4">
                    <BookOpen className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="mt-4 text-lg font-semibold text-foreground">
                    No courses found
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                    Try changing your search or category.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
                <CourseCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    imageUrl={item.imageUrl!}
                    chaptersLength={item.chapters.length}
                    price={item.price!}
                    progress={item.progress}
                    category={item?.category?.name ?? "Uncategorized"}
                />
            ))}
        </div>
    );
};