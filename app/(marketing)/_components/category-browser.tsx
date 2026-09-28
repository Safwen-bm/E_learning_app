"use client";

import { useState } from "react";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import type {
  LandingCategory,
  LandingCourse,
} from "@/actions/get-landing-courses";
import { LandingCourseCard } from "./landing-course-card";

const MAX_VISIBLE = 6;

interface CategoryBrowserProps {
  categories: LandingCategory[];
  courses: LandingCourse[];
}

export const CategoryBrowser = ({
  categories,
  courses,
}: CategoryBrowserProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = selected
    ? courses.filter((course) => course.categoryId === selected)
    : courses;
  const visible = filtered.slice(0, MAX_VISIBLE);

  const chipClass = (active: boolean) =>
    cn(
      "rounded-sm border px-4 py-2 text-sm transition-colors",
      active
        ? "border-marketing-yellow bg-marketing-yellow text-marketing-bgDeep"
        : "border-marketing-line text-marketing-chalkDim hover:text-marketing-chalk"
    );

  const linkClass =
    "text-sm text-marketing-chalkDim underline decoration-marketing-line decoration-2 underline-offset-4 hover:text-marketing-chalk";

  return (
    <section id="categories" className="chalk-texture scroll-mt-16 bg-marketing-bg">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="font-display text-3xl text-marketing-chalk md:text-4xl">
          Browse by category
        </h2>

        <div className="mt-8 flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={selected === null}
            onClick={() => setSelected(null)}
            className={chipClass(selected === null)}
          >
            All ({courses.length})
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              aria-pressed={selected === category.id}
              onClick={() => setSelected(category.id)}
              className={chipClass(selected === category.id)}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((course) => (
            <LandingCourseCard key={course.id} course={course} variant="dark" />
          ))}
        </div>

        <div className="mt-10">
          <SignedOut>
            <Link href="/sign-up" className={linkClass}>
              Create a free account to browse the full catalog
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/search" className={linkClass}>
              Browse the full catalog
            </Link>
          </SignedIn>
        </div>
      </div>
    </section>
  );
};