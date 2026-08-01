import { Chapter, Course, UserProgress } from "@prisma/client";
import { Logo } from "../../../../(dashboard)/_components/logo";

import { NavbarRoutes } from "@/components/navbar-routes";
import { CourseMobileSidebar } from "./course-mobile-sidebar";

interface CourseNavbarProps {
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null;
        })[];
    };
    progressCount: number;
}

export const CourseNavbar = ({
    course,
    progressCount,
}: CourseNavbarProps) => {
    return (
        <div className="relative p-4 border-b h-full flex items-center bg-white shadow-sm">
            
            {/* Left */}
            <div className="flex items-center">
                <CourseMobileSidebar
                    course={course}
                    progressCount={progressCount}
                />
            </div>

            {/* Center (TRUE center) */}
            <div className="absolute left-1/2 -translate-x-1/2">
                <Logo />
            </div>

            {/* Right */}
            <div className="ml-auto">
                <NavbarRoutes />
            </div>
        </div>
    );
};

export default CourseNavbar;
