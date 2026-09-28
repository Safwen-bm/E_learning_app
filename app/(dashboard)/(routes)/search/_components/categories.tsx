"use client";

import { Category } from "@prisma/client";
import {
    Calculator,
    Camera,
    Clapperboard,
    Laptop,
    LayoutGrid,
    LucideIcon,
    Music,
    Tag,
    Wrench,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

import { CategoryItem } from "./category-item";

interface CategoriesProps {
    items: Category[];
}

const iconMap: Record<string, LucideIcon> = {
    "Music": Music,
    "Photography": Camera,
    "Accounting": Calculator,
    "Computer Science": Laptop,
    "Filming": Clapperboard,
    "Engineering": Wrench,
};

export const Categories = ({ items }: CategoriesProps) => {
    const searchParams = useSearchParams();
    const currentCategoryId = searchParams.get("categoryId");

    // Filter out "Fitness" from displayed categories
    const filteredItems = items.filter((item) => item.name !== "Fitness");

    return (
        <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
            <CategoryItem
                label="All"
                icon={LayoutGrid}
                value={undefined}
                isSelected={!currentCategoryId}
            />

            {filteredItems.map((item) => (
                <CategoryItem
                    key={item.id}
                    label={item.name}
                    icon={iconMap[item.name] ?? Tag}
                    value={item.id}
                    isSelected={currentCategoryId === item.id}
                />
            ))}
        </div>
    );
};