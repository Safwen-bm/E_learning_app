import "./globals.css";
import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import { ClerkProvider } from "@clerk/nextjs";
import { ToastProvider } from "@/components/providers/toaster-provider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import { fraunces } from "@/lib/fonts";
const inter = Inter ({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "AcademyX",
  description: "Teach what you know. Learn what you don't.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} ${fraunces.variable}`}>
          <ConfettiProvider />
          <ToastProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
