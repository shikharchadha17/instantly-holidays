import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import AIBuddy from "@/components/AIBuddy";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Instant Holidays by C&K",
  description: "Plan your holiday in minutes. Explore, customize, and book without the wait.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] antialiased bg-white text-gray-900`}>
        {children}
        <AIBuddy />
      </body>
    </html>
  );
}
