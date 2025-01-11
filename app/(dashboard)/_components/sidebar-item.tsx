"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";
import "../../globals.css";

interface SidebarItemProps {
    icon: React.ReactNode;  
    label: string; 
    href: string; 
}

export const SidebarItem = ({
    icon,
    label,
    href,
}: SidebarItemProps) => {
    const pathname = usePathname(); 
    const router = useRouter(); 

    const isActive =
        (pathname === "/" && href === "/") ||
        pathname === href ||
        pathname?.startsWith(`${href}/`);

    const onClick = () => {
        router.push(href); 
    };

    return (
        <button
            onClick={onClick}
            type="button"
            className={cn(
                "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 pr-6 py-2 transition-all hover:text-slate-600 hover:bg-slate-300/20",  
                isActive ? "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20" : ""
            )}
            aria-label={label}  // Accessibility
        >
            <div className="flex items-center gap-x-2">
                {icon}
                <span>{label}</span> {/* Wrap label in a span for better semantics */}
            </div>
            <div
                className={cn(
                    "ml-auto opacity-0 border-2 border-sky-700 h-full transition-all",
                    isActive ? "opacity-100" : ""
                )}
            />
        </button>
    );
};
