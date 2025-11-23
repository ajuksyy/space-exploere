"use client";

import { Button } from "@/components/ui/button";
import { useQuizStore } from "@/store/quizStore";
import { quizQuestions } from "@/data/quizQuestions";
import HamburgerMenu from "./HamburgerMenu";

export default function Header() {
  const { openQuiz, startQuiz } = useQuizStore();

  const handleQuizClick = () => {
    // Shuffle questions and take 10 random ones
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
    startQuiz(shuffled.slice(0, 10));
    openQuiz();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-sm">
      <nav className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        <HamburgerMenu />
        <Button
          onClick={handleQuizClick}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-sm sm:text-base px-4 sm:px-6"
        >
          Quiz
        </Button>
      </nav>
    </header>
  );
}

