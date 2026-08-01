"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { isTeacher } from "@/lib/teacher";
import { SearchInput } from "./search-input";

export const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";

  return (
    <div className="flex items-center justify-between w-full ml-6 md:ml-0">
      {/* Search - centered on search page (desktop only) */}
      <div className="flex-1 flex justify-center max-w-2xl">
        {isSearchPage && (
          <div className="hidden md:block w-full">
            <SearchInput />
          </div>
        )}
      </div>

      {/* Right side: Actions + User */}
      <div className="flex items-center gap-x-5">
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button variant="ghost" size="sm" className="hover:bg-accent/50">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button 
              size="sm" 
              className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-primary/20 transition-all hover:scale-105"
            >
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Teacher Mode
            </Button>
          </Link>
        ) : null}

        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};