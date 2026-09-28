import type { LandingCourse } from "@/actions/get-landing-courses";
import { LandingCourseCard } from "./landing-course-card";

interface PopularCoursesProps {
  courses: LandingCourse[];
}

export const PopularCourses = ({ courses }: PopularCoursesProps) => {
  return (
    <section
      id="courses"
      className="scroll-mt-16 bg-marketing-chalk text-marketing-ink"
    >
      <div className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="font-display text-3xl md:text-4xl">Popular courses</h2>
        <p className="mt-3 max-w-xl text-marketing-ink/65">
          A good place to start.
        </p>

        {courses.length === 0 ? (
          <p className="mt-12 rounded-sm border border-marketing-ink/10 bg-white p-8 text-marketing-ink/65">
            Courses are being published right now. Check back soon.
          </p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {courses.map((course) => (
              <LandingCourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};