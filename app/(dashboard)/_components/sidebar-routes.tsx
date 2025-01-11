"use client";

import { BarChart, List, Compass, Layout } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";
import "../../globals.css";

interface Route {
    icon: React.ReactNode;  
    label: string;
    href: string; 
}

const guestRoutes: Route[] = [
    {
        icon: <Layout size={22} className="text-slate-500" />,
        label: "Dashboard",
        href: "/",
    },
    {
        icon: <Compass size={22} className="text-slate-500" />,
        label: "Browse",
        href: "/search",
    },
];

const teacherRoutes: Route[] = [
    {
        icon: <List size={22} className="text-slate-500" />,
        label: "Courses",
        href: "/teacher/courses",
    },
    {
        icon: <BarChart size={22} className="text-slate-500" />,
        label: "Analytics",
        href: "/teacher/analytics",
    },
];

export const SidebarRoutes = () => {
    const pathname = usePathname();
    const isTeacherPage = pathname?.includes("/teacher");
    const routes = isTeacherPage ? teacherRoutes : guestRoutes;

    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem 
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
    );
};
