import { clerkClient } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

export type LandingCourse = {
    id: string;
    title: string;
    imageUrl: string | null;
    price: number | null;
    category: string | null;
    categoryId: string | null;
    chaptersCount: number;
    purchasesCount: number;
    instructorName: string;
};

export type LandingCategory = {
    id: string;
    name: string;
    count: number;
};

type LandingData = {
    courses: LandingCourse[];
    popular: LandingCourse[];
    categories: LandingCategory[];
};

const FALLBACK_INSTRUCTOR = "AcademyX instructor";

const getInstructorNames = async (userIds: string[]) => {
    const names = new Map<string, string>();
    if (userIds.length === 0) return names;

    try {
        const client = await clerkClient();
        const { data } = await client.users.getUserList({
            userId: userIds,
            limit: userIds.length,
        });

        for (const user of data) {
            const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");
            names.set(user.id, fullName || user.username || FALLBACK_INSTRUCTOR);
        }
    } catch (error) {
        console.log("GET_INSTRUCTOR_NAMES", error);
    }

    return names;
};

export const getLandingCourses = async (): Promise<LandingData> => {
    try {
        const rows = await db.course.findMany({
            where: {
                isPublished: true,
                // a course without a published chapter cannot be opened
                chapters: { some: { isPublished: true } },
            },
            include: {
                category: true,
                chapters: {
                    where: { isPublished: true },
                    select: { id: true },
                },
                _count: { select: { purchases: true } },
            },
            orderBy: { createdAt: "desc" },
            take: 60,
        });

        const instructors = await getInstructorNames(
            Array.from(new Set(rows.map((row) => row.userId)))
        );

        const courses: LandingCourse[] = rows.map((row) => ({
            id: row.id,
            title: row.title,
            imageUrl: row.imageUrl,
            price: row.price,
            category: row.category?.name ?? null,
            categoryId: row.categoryId,
            chaptersCount: row.chapters.length,
            purchasesCount: row._count.purchases,
            instructorName: instructors.get(row.userId) ?? FALLBACK_INSTRUCTOR,
        }));

        // Most purchased first. The sort is stable, so ties stay newest first.
        const popular = [...courses]
            .sort((a, b) => b.purchasesCount - a.purchasesCount)
            .slice(0, 4);

        const categoryRows = await db.category.findMany({
            orderBy: { name: "asc" },
        });

        const categories: LandingCategory[] = categoryRows
            .map((category) => ({
                id: category.id,
                name: category.name,
                count: courses.filter((course) => course.categoryId === category.id).length,
            }))
            .filter((category) => category.count > 0);

        return { courses, popular, categories };
    } catch (error) {
        console.log("GET_LANDING_COURSES", error);
        return { courses: [], popular: [], categories: [] };
    }
};