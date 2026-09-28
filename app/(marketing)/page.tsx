import { getLandingCourses } from "@/actions/get-landing-courses";

import { Hero } from "./_components/hero";
import { HowItWorks } from "./_components/how-it-works";
import { WhyAcademyx } from "./_components/why-academyx";
import { PopularCourses } from "./_components/popular-courses";
import { CategoryBrowser } from "./_components/category-browser";
import { InstructorCta } from "./_components/instructor-cta";

const MarketingPage = async () => {
  const { courses, popular, categories } = await getLandingCourses();

  return (
    <>
      <Hero />
      <HowItWorks />
      <WhyAcademyx />
      <PopularCourses courses={popular} />
      {courses.length > 0 && (
        <CategoryBrowser categories={categories} courses={courses} />
      )}
      <InstructorCta />
    </>
  );
};

export default MarketingPage;