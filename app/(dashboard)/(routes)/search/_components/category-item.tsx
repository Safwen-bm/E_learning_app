"use client";

import qs from "query-string";
import { IconType } from "react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface CategoryItemProps {
    label: string;
    value?: string;
    icon?: IconType;
    isSelected?: boolean;
};

export const CategoryItem = ({
    label,
    value,
    icon: Icon,
    isSelected: externalIsSelected,
}: CategoryItemProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentCategoryId = searchParams.get("categoryId");
    const currentTitle = searchParams.get("title");

    const isSelected = externalIsSelected ?? currentCategoryId === value;

    const onClick = () => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                title: currentTitle,
                categoryId: isSelected ? null : value,
            }
        }, { skipNull: true, skipEmptyString: true });

        router.push(url);
    };

    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap",
                "bg-background border border-border hover:border-primary/50 hover:bg-accent/50",
                isSelected && "bg-primary/10 text-primary border-primary shadow-md"
            )}
            type="button"
        >
            {Icon && <Icon size={18} className={cn(isSelected && "text-primary")} />}
            <span>{label}</span>
        </button>
    );
}