import { Category, Course } from "@prisma/client";
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
            <div className="text-center py-32">
                <p className="text-3xl font-semibold text-muted-foreground">No courses found</p>
                <p className="text-lg text-muted-foreground mt-4">Try changing your search or category</p>
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
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