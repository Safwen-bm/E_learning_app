"use client";

import qs from "query-string";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface CategoryItemProps {
    label: string;
    value?: string;
    icon?: LucideIcon;
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
            type="button"
            aria-pressed={isSelected}
            className={cn(
                "inline-flex h-9 shrink-0 items-center gap-x-2 whitespace-nowrap rounded-full border px-4 text-sm font-medium transition-colors",
                isSelected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-foreground/20 hover:bg-accent hover:text-foreground"
            )}
        >
            {Icon && <Icon className="h-4 w-4" />}
            <span>{label}</span>
        </button>
    );
};