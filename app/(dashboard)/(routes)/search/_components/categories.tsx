"use client";

import { Category } from "@prisma/client";
import {
    FcEngineering,
    FcFilmReel,
    FcMultipleDevices,
    FcMusic,
    FcOldTimeCamera,
    FcSalesPerformance,
    FcList
} from "react-icons/fc";
import { IconType } from "react-icons";

import { CategoryItem } from "./category-item";
import { useSearchParams } from "next/navigation";

interface CategoriesProps {
    items: Category[];
}

const iconMap: Record<string, IconType> = {
    "All": FcList,
    "Music": FcMusic,
    "Photography": FcOldTimeCamera,
    // Removed "Fitness": FcSportsMode,  ← Deleted to make space
    "Accounting": FcSalesPerformance,
    "Computer Science": FcMultipleDevices,
    "Filming": FcFilmReel,
    "Engineering": FcEngineering,
};

export const Categories = ({ items }: CategoriesProps) => {
    const searchParams = useSearchParams();
    const currentCategoryId = searchParams.get("categoryId");

    // Filter out "Fitness" from displayed categories
    const filteredItems = items.filter(item => item.name !== "Fitness");

    return (
        <div className="flex flex-wrap gap-2">  {/* Wrap allowed but with small buttons it won't wrap */}
            {/* All Courses */}
            <CategoryItem
                key="all"
                label="All Courses"
                icon={iconMap["All"]}
                value={undefined}
                isSelected={!currentCategoryId}
            />

            {/* Filtered categories */}
            {filteredItems.map((item) => (
                <CategoryItem
                    key={item.id}
                    label={item.name}
                    icon={iconMap[item.name]}
                    value={item.id}
                    isSelected={currentCategoryId === item.id}
                />
            ))}
        </div>
    );
}