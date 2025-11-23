import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StarsBackground from "@/components/StarsBackground";
import QuizDialog from "@/components/quiz/QuizDialog";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Space Explorer - Solar System Exploration",
  description: "Explore the solar system in 3D and test your knowledge with interactive quizzes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <StarsBackground />
        {children}
        <QuizDialog />
      </body>
    </html>
  );
}
