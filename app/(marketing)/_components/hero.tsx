import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export const Hero = () => {
    return (
    <div className="relative flex min-h-[min(56.25vw,calc(100svh_-_4rem))] items-center overflow-hidden">
      {/* Background: image tinted with the hero green, visible on both sides */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/hero-bg.jpg"
          alt=""
          fill
          priority
          quality={70}
          sizes="100vw"
          className="object-cover object-center opacity-55"
        />
        {/* Even tint over the whole image */}
        <div className="absolute inset-0 bg-marketing-bg/40 md:bg-marketing-bg/25" />
        {/* Slight vignette on both edges, clear in the middle */}
        <div className="absolute inset-0 bg-gradient-to-r from-marketing-bg/40 via-transparent to-marketing-bg/30" />
        {/* Soft edge at the bottom so the image never ends abruptly */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-marketing-bg to-transparent" />
        {/* Chalk dust texture on top of everything */}
        <div className="chalk-texture absolute inset-0" />
      </div>

      <section className="relative mx-auto grid w-full max-w-6xl gap-16 px-6 pb-24 pt-16 md:grid-cols-2 md:pt-24">
        <div className="flex flex-col justify-center">
          <h1 className="font-display text-5xl leading-[1.1] text-marketing-chalk md:text-6xl">
            Teach what you know. Learn what you don&apos;t.
          </h1>
          <p className="mt-6 max-w-md text-lg text-marketing-chalkDim">
            AcademyX is where instructors publish real courses and students
            actually finish them: video lessons, chapters you can check off,
            and progress that&apos;s always saved.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <SignedOut>
              <Link
                href="/sign-up"
                className="rounded-sm bg-marketing-yellow px-6 py-3 text-sm font-medium text-marketing-bgDeep shadow-paper transition-transform hover:-translate-y-0.5"
              >
                Start learning
              </Link>
              <a
                href="#courses"
                className="text-sm text-marketing-chalkDim underline decoration-marketing-line decoration-2 underline-offset-4 hover:text-marketing-chalk"
              >
                Browse courses
              </a>
            </SignedOut>
            <SignedIn>
              <Link
                href="/dashboard"
                className="rounded-sm bg-marketing-yellow px-6 py-3 text-sm font-medium text-marketing-bgDeep shadow-paper transition-transform hover:-translate-y-0.5"
              >
                Go to your dashboard
              </Link>
            </SignedIn>
          </div>
        </div>

        {/* Pinned lesson card mockup, built from plain divs */}
        <div className="relative hidden items-center justify-center md:flex">
          <div className="relative w-72 rotate-[-4deg] rounded-sm bg-[#1E3B34] p-5 shadow-paper">
            <span className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-marketing-coral" />
            <div className="h-32 rounded-sm bg-gradient-to-br from-marketing-yellow/30 to-marketing-coral/30" />
            <p className="mt-4 font-display text-lg text-marketing-chalk">
              Advanced CSS Layouts
            </p>
            <p className="mt-1 text-xs text-marketing-chalkDim">
              Chapter 4 of 9 &middot; Sara Bennani
            </p>
            <div className="mt-4 h-1.5 w-full rounded-full bg-marketing-line">
              <div className="h-1.5 w-2/3 rounded-full bg-marketing-yellow" />
            </div>
          </div>

          <div className="absolute -bottom-6 -right-2 w-40 rotate-[6deg] rounded-sm bg-[#1E3B34] p-4 shadow-paper">
            <span className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-marketing-yellow" />
            <p className="text-xs text-marketing-chalkDim">Completed today</p>
            <p className="font-display text-2xl text-marketing-chalk">3 lessons</p>
          </div>
        </div>
      </section>
    </div>
  );
};