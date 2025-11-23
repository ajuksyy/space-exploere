"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useQuizStore } from "@/store/quizStore";
import QuizQuestion from "./QuizQuestion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, RotateCcw, ArrowLeft } from "lucide-react";
import { playButtonClickSound, playBackButtonSound } from "@/lib/sounds";
import { motion } from "framer-motion";

export default function QuizDialog() {
  const {
    isOpen,
    closeQuiz,
    questions,
    currentQuestionIndex,
    score,
    isFinished,
    resetQuiz,
    startQuiz,
  } = useQuizStore();

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  const handleRestart = () => {
    playButtonClickSound();
    resetQuiz();
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    startQuiz(shuffled.slice(0, 10));
  };

  const handleClose = () => {
    playBackButtonSound();
    closeQuiz();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-black to-gray-900 border-white/20 text-white backdrop-blur-xl">
        <DialogHeader>
          <div className="flex items-center justify-between mb-4">
            <div>
              <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Solar System Quiz
              </DialogTitle>
              <DialogDescription className="text-gray-300 mt-1">
                Test your knowledge about our solar system! 🌌
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="text-white hover:text-yellow-400 hover:bg-yellow-400/10 rounded-full transition-all"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        {!isFinished ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 backdrop-blur-sm">
              <span className="text-gray-300 font-medium">
                Question <span className="text-yellow-400 font-bold">{currentQuestionIndex + 1}</span> of <span className="text-white font-bold">{totalQuestions}</span>
              </span>
              <span className="text-yellow-400 font-bold text-lg">
                Score: <span className="text-white">{score}</span>/{totalQuestions}
              </span>
            </div>

            {currentQuestion && (
              <QuizQuestion question={currentQuestion} />
            )}
          </div>
        ) : (
          <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-white/20 backdrop-blur-xl">
            <CardHeader className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="flex justify-center mb-4"
              >
                <Trophy className="h-20 w-20 text-yellow-400 drop-shadow-lg" />
              </motion.div>
              <CardTitle className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Quiz Complete! 🎉
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <div className="space-y-3 p-6 rounded-xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 backdrop-blur-sm">
                <p className="text-5xl font-bold text-white">
                  {score}/{totalQuestions}
                </p>
                <p className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  {percentage}%
                </p>
                <p className="text-lg text-gray-200 font-medium">
                  {percentage >= 80
                    ? "🌟 Excellent! You're a space expert!"
                    : percentage >= 60
                    ? "👍 Good job! Keep learning!"
                    : "📚 Keep exploring! The universe is vast!"}
                </p>
              </div>
              <Button
                onClick={handleRestart}
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold w-full py-6 rounded-full shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/70 transition-all hover:scale-105 text-lg"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                Restart Quiz
              </Button>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
}

