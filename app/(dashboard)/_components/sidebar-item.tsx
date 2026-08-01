"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SidebarItemProps {
    icon: LucideIcon;  // ← Only LucideIcon (all your icons are from lucide-react)
    label: string; 
    href: string; 
}

export const SidebarItem = ({
    icon: Icon,
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
                "flex items-center gap-x-3 text-foreground/70 text-md font-medium pl-6 pr-8 py-4 rounded-xl transition-all duration-300",
                "hover:text-foreground hover:bg-accent/50 hover:shadow-md hover:scale-105",
                isActive && "text-primary bg-primary/10 shadow-lg scale-105 border-l-4 border-primary"
            )}
        >
            <div className="flex items-center gap-x-3">
                <div className={cn(
                    "transition-colors",
                    isActive ? "text-primary" : ""
                )}>
                    <Icon className="h-5 w-5" /> 
                </div>
                <span className="tracking-wide">{label}</span>
            </div>
        </button>
    );
};