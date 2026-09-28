import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import { Logo } from "@/components/logo";

const GITHUB_URL = "https://github.com/Safwen-bm";
const LINKEDIN_URL = "https://linkedin.com/in/safwen-ben-mabrouk";

const columns = [
  {
    title: "Platform",
    links: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "Popular courses", href: "/#courses" },
      { label: "Categories", href: "/#categories" },
      { label: "Teach", href: "/#teach" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Log in", href: "/sign-in" },
      { label: "Sign up", href: "/sign-up" },
    ],
  },
];

export const FooterLanding = () => {
  return (
    <footer className="border-t border-marketing-line bg-marketing-bgDeep text-marketing-chalkDim">
      <div className="mx-auto max-w-6xl px-6">
        <div className="border-b border-marketing-line py-20">
          <p className="max-w-2xl font-display text-4xl leading-tight text-marketing-chalk md:text-5xl">
            Teach what you know. Learn what you don&apos;t.
          </p>
        </div>

        <div className="grid gap-12 py-16 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Logo href="/" size="lg" variant="dark" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Structured courses, chapters you can check off, and progress
              that&apos;s always saved.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className="font-display text-lg text-marketing-chalk">
                {column.title}
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-marketing-chalk"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="font-display text-lg text-marketing-chalk">Connect</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-marketing-chalk"
                >
                  <FaGithub className="h-4 w-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-marketing-chalk"
                >
                  <FaLinkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-marketing-line py-6 text-xs">
          <div className="grid gap-2 md:grid-cols-3 md:items-center">
            <p className="text-left">
              &copy; {new Date().getFullYear()} AcademyX.
            </p>

            <p className="text-left md:text-center">
              Designed and built by Safwen Ben Mabrouk.
            </p>

            <p className="text-left md:text-right">
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};