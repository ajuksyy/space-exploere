"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Play, HelpCircle, Info, Gamepad2 } from "lucide-react";
import { useQuizStore } from "@/store/quizStore";
import { quizQuestions } from "@/data/quizQuestions";
import { playButtonClickSound } from "@/lib/sounds";

export default function Home() {
  const { openQuiz, startQuiz } = useQuizStore();

  const handleQuizClick = () => {
    playButtonClickSound();
    // Shuffle questions and take 10 random ones
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
    startQuiz(shuffled.slice(0, 10));
    openQuiz();
  };

  const handleButtonClick = () => {
    playButtonClickSound();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6">
      <div className="flex flex-col items-center text-center space-y-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h1 className="text-5xl sm:text-7xl font-bold text-white mb-2">
            Space Explorer
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-2xl mx-auto">
            Journey through our cosmic neighborhood
          </p>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/solar-system" onClick={handleButtonClick}>
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg sm:text-xl px-8 sm:px-12 py-6 sm:py-8 rounded-full shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/70 transition-all hover:scale-105"
            >
              <Play className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
              Start Exploration
            </Button>
          </Link>
        </motion.div>

        {/* Additional Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <Button
            onClick={handleQuizClick}
            size="lg"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-base sm:text-lg px-6 sm:px-10 py-5 sm:py-6 rounded-full shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/70 transition-all hover:scale-105"
          >
            <HelpCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Quiz
          </Button>
          <Link href="/about" onClick={handleButtonClick}>
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-base sm:text-lg px-6 sm:px-10 py-5 sm:py-6 rounded-full shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/70 transition-all hover:scale-105"
            >
              <Info className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              About
            </Button>
          </Link>
          <Link href="/game" onClick={handleButtonClick}>
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-base sm:text-lg px-6 sm:px-10 py-5 sm:py-6 rounded-full shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/70 transition-all hover:scale-105"
            >
              <Gamepad2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Let's Play
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
