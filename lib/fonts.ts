import { Fraunces } from "next/font/google";

// Display serif used only on the marketing (landing) route.
// Loaded as a CSS variable so it never touches the dashboard's font stack.
export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});
