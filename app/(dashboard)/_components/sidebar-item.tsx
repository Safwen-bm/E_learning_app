"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SidebarItemProps {
    icon: LucideIcon;
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
                "flex items-center gap-x-3 w-full text-sm font-medium text-muted-foreground pl-3 pr-3 py-2.5 rounded-md border-l-2 border-transparent transition-colors",
                "hover:text-foreground hover:bg-accent/60",
                isActive && "text-foreground bg-accent border-[hsl(var(--ring))]"
            )}
        >
            <Icon className="h-4 w-4 shrink-0" />
            <span>{label}</span>
        </button>
    );
};