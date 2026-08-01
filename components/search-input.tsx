"use client";

import qs from "query-string";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";

export const SearchInput = () => {
    const [value, setValue] = useState("");
    const debouncedValue = useDebounce(value);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const currentCategoryId = searchParams.get("categoryId");

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                categoryId: currentCategoryId,
                title: debouncedValue,
            }
        }, { skipEmptyString: true, skipNull: true });

        router.push(url);
    }, [debouncedValue, currentCategoryId, router, pathname]);

    return (
        <div className="relative max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/60" />
            <Input
                onChange={(e) => setValue(e.target.value)}
                value={value}
                placeholder="Search for a course..."
                className="
                    w-full 
                    pl-12 
                    pr-6 
                    py-6 
                    rounded-full 
                    bg-background/70 
                    backdrop-blur-xl 
                    border-border/50 
                    shadow-lg 
                    focus-visible:ring-2 
                    focus-visible:ring-primary/50 
                    focus-visible:border-primary/30 
                    transition-all 
                    duration-300 
                    hover:shadow-xl 
                    hover:bg-background/80
                    placeholder:text-foreground/50
                "
            />
        </div>
    );
};