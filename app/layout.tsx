import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CustomCursor } from "@/components/layout/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});


export const metadata: Metadata = {
  title: "Semyon — Product Designer",
  description:
    "Портфолио продуктового дизайнера. Целеустремлённый профессионал, который знает как достичь результата.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground" data-cursor-active="true">
        <SmoothScroll />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
