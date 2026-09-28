import Link from "next/link";
import { Check } from "lucide-react";
import { auth } from "@clerk/nextjs/server";

import { cn } from "@/lib/utils";
import { isTeacher } from "@/lib/teacher";

const LINKEDIN_URL = "https://linkedin.com/in/safwen-ben-mabrouk";

const setup = [
  { label: "Title", done: true },
  { label: "Description", done: true },
  { label: "Course image", done: true },
  { label: "Category", done: true },
  { label: "Price", done: false },
  { label: "One published chapter", done: false },
];

const buttonClass =
  "inline-block rounded-sm bg-marketing-bgDeep px-6 py-3 text-sm font-medium text-marketing-chalk transition-colors hover:bg-marketing-bg";

export const InstructorCta = async () => {
  const { userId } = await auth();
  const canTeach = isTeacher(userId);
  const doneCount = setup.filter((item) => item.done).length;

  return (
    <section
      id="teach"
      className="scroll-mt-16 bg-marketing-yellow text-marketing-bgDeep"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl md:text-4xl">
            Have something worth teaching?
          </h2>
          <p className="mt-4 max-w-md text-lg text-marketing-bgDeep/75">
            Publish your course on AcademyX and help people learn something
            useful.
          </p>

          <div className="mt-8">
            {canTeach ? (
              <Link href="/teacher/create" className={buttonClass}>
                Create a new course
              </Link>
            ) : (
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass}
              >
                Become an instructor
              </a>
            )}
          </div>

          {!canTeach && (
            <p className="mt-4 max-w-md text-sm text-marketing-bgDeep/70">
              Instructor accounts are approved manually. Send a message and
              tell us what you would teach.
            </p>
          )}
        </div>

        <div className="hidden justify-center md:flex">
          <div className="w-72 rotate-[3deg] rounded-sm bg-marketing-bgDeep p-6 text-marketing-chalk shadow-[6px_6px_0_0_rgba(14,33,29,0.35)]">
            <p className="font-display text-lg">Course setup</p>
            <p className="mt-1 text-xs text-marketing-chalkDim">
              Complete all fields ({doneCount}/{setup.length})
            </p>
            <ul className="mt-5 space-y-3">
              {setup.map((item) => (
                <li key={item.label} className="flex items-center gap-3 text-sm">
                  <span
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full border",
                      item.done
                        ? "border-marketing-yellow bg-marketing-yellow text-marketing-bgDeep"
                        : "border-marketing-chalkDim/50"
                    )}
                  >
                    {item.done && <Check className="h-3 w-3" />}
                  </span>
                  <span
                    className={
                      item.done ? "text-marketing-chalk" : "text-marketing-chalkDim"
                    }
                  >
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};