"use client";

import { Suspense } from "react";
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
            <Suspense fallback={null}>
              <SearchInput />
            </Suspense>
          </div>
        )}
      </div>

      {/* Right side: Actions + User */}
      <div className="flex items-center gap-x-4">
        {isTeacherPage || isCoursePage ? (
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button size="sm">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Teacher mode
            </Button>
          </Link>
        ) : null}

        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};