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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 to-black border-white/20 text-white">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-yellow-400">
                Solar System Quiz
              </DialogTitle>
              <DialogDescription className="text-gray-300">
                Test your knowledge about our solar system!
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="text-white hover:text-yellow-400"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        {!isFinished ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
              <span className="text-yellow-400 font-semibold">
                Score: {score}/{totalQuestions}
              </span>
            </div>

            {currentQuestion && (
              <QuizQuestion question={currentQuestion} />
            )}
          </div>
        ) : (
          <Card className="bg-black/50 border-white/20">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Trophy className="h-16 w-16 text-yellow-400" />
              </div>
              <CardTitle className="text-3xl font-bold text-yellow-400">
                Quiz Complete!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <div className="space-y-2">
                <p className="text-4xl font-bold text-white">
                  {score}/{totalQuestions}
                </p>
                <p className="text-2xl font-semibold text-yellow-400">
                  {percentage}%
                </p>
                <p className="text-gray-300">
                  {percentage >= 80
                    ? "🌟 Excellent! You're a space expert!"
                    : percentage >= 60
                    ? "👍 Good job! Keep learning!"
                    : "📚 Keep exploring! The universe is vast!"}
                </p>
              </div>
              <Button
                onClick={handleRestart}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold w-full"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Restart Quiz
              </Button>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
}

