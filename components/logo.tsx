import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  href?: string;
  size?: "sm" | "lg";
  /** Which background this sits on — controls ink color, not the mark itself. */
  variant?: "light" | "dark";
  className?: string;
}

export const Logo = ({ href = "/", size = "lg", variant = "light", className }: LogoProps) => {
  const ink = variant === "dark" ? "text-marketing-chalk" : "text-[#16241F]";
  const accent = variant === "dark" ? "text-marketing-yellow" : "text-[#B9812E]";

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-baseline font-display focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B9812E]/50 rounded-sm",
        className
      )}
    >
      <span className={cn(ink, size === "lg" ? "text-3xl" : "text-xl")}>Academy</span>
      <span className={cn(accent, size === "lg" ? "text-3xl" : "text-xl")}>X</span>
    </Link>
  );
};
