"use client";

import { useState } from "react";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";

const links = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#courses", label: "Courses" },
  { href: "/#categories", label: "Categories" },
  { href: "/#teach", label: "Teach" },
];

export const NavbarLanding = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-marketing-line bg-marketing-bg/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo href="/" size="sm" variant="dark" />


        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-marketing-chalkDim transition-colors hover:text-marketing-chalk"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <SignedOut>
            <Link
              href="/sign-in"
              className="text-sm text-marketing-chalkDim transition-colors hover:text-marketing-chalk"
            >
              Log in
            </Link>
            <Link
              href="/sign-up"
              className="rounded-sm bg-marketing-yellow px-4 py-2 text-sm font-medium text-marketing-bgDeep transition-colors hover:bg-marketing-chalk"
            >
              Get started
            </Link>
          </SignedOut>
          <SignedIn>
            <Link
              href="/dashboard"
              className="rounded-sm bg-marketing-yellow px-4 py-2 text-sm font-medium text-marketing-bgDeep transition-colors hover:bg-marketing-chalk"
            >
              Go to dashboard
            </Link>
          </SignedIn>
        </div>

        <button
          className="text-marketing-chalk md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-marketing-line px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm text-marketing-chalkDim"
              >
                {link.label}
              </a>
            ))}
            <SignedOut>
              <Link href="/sign-in" className="text-sm text-marketing-chalkDim">
                Log in
              </Link>
              <Link
                href="/sign-up"
                className="w-fit rounded-sm bg-marketing-yellow px-4 py-2 text-sm font-medium text-marketing-bgDeep"
              >
                Get started
              </Link>
            </SignedOut>
            <SignedIn>
              <Link
                href="/dashboard"
                className="w-fit rounded-sm bg-marketing-yellow px-4 py-2 text-sm font-medium text-marketing-bgDeep"
              >
                Go to dashboard
              </Link>
            </SignedIn>
          </nav>
        </div>
      )}
    </header>
  );
};
