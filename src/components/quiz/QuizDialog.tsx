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
import { Trophy, RotateCcw, ArrowLeft, XCircle } from "lucide-react";
import { playButtonClickSound, playBackButtonSound } from "@/lib/sounds";
import { motion } from "framer-motion";
import { quizQuestions } from "@/data/quizQuestions";
import { Difficulty } from "@/data/quizQuestions";

export default function QuizDialog() {
  const {
    isOpen,
    closeQuiz,
    questions,
    currentQuestionIndex,
    score,
    isFinished,
    selectedDifficulty,
    wrongAnswers,
    resetQuiz,
    startQuiz,
    selectDifficulty,
  } = useQuizStore();

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  const handleDifficultySelect = (difficulty: Difficulty) => {
    playButtonClickSound();
    selectDifficulty(difficulty);
    const filteredQuestions = quizQuestions.filter((q) => q.difficulty === difficulty);
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
    startQuiz(shuffled.slice(0, 10));
  };

  const handleRestart = () => {
    playButtonClickSound();
    resetQuiz();
  };

  const handleClose = () => {
    playBackButtonSound();
    closeQuiz();
    resetQuiz();
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

        {!selectedDifficulty ? (
          <div className="space-y-6 py-4">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Choose Your Difficulty Level</h3>
              <p className="text-gray-400">Select a difficulty to begin the quiz</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(["easy", "medium", "hard"] as Difficulty[]).map((difficulty) => (
                <motion.button
                  key={difficulty}
                  onClick={() => handleDifficultySelect(difficulty)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-6 rounded-xl border-2 bg-gradient-to-br from-gray-800/50 to-black/50 border-yellow-500/30 hover:border-yellow-500/60 transition-all backdrop-blur-sm hover:shadow-lg hover:shadow-yellow-500/20"
                >
                  <div className="text-center space-y-2">
                    <div className="text-4xl mb-2">
                      {difficulty === "easy" && "🌱"}
                      {difficulty === "medium" && "⚡"}
                      {difficulty === "hard" && "🔥"}
                    </div>
                    <h4 className="text-xl font-bold text-white capitalize">{difficulty}</h4>
                    <p className="text-sm text-gray-400">10 questions</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        ) : !isFinished ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 backdrop-blur-sm">
              <span className="text-gray-300 font-medium">
                Question <span className="text-yellow-400 font-bold">{currentQuestionIndex + 1}</span> of <span className="text-white font-bold">{totalQuestions}</span>
              </span>
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-yellow-500/20 text-yellow-400 border-2 border-yellow-500/40">
                {selectedDifficulty.toUpperCase()}
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
            <CardContent className="space-y-6">
              <div className="text-center space-y-3 p-6 rounded-xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 backdrop-blur-sm">
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

              {wrongAnswers.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <XCircle className="h-6 w-6 text-red-400" />
                    Questions You Got Wrong ({wrongAnswers.length})
                  </h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {wrongAnswers.map((wrong, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-red-600/5 border border-red-500/30 backdrop-blur-sm"
                      >
                        <p className="text-white font-semibold mb-2">{wrong.question.question}</p>
                        <div className="space-y-1 text-sm">
                          <p className="text-red-400">
                            ❌ Your answer: <span className="text-white">{wrong.question.options[wrong.selectedAnswer]}</span>
                          </p>
                          <p className="text-green-400">
                            ✓ Correct answer: <span className="text-white">{wrong.question.options[wrong.correctAnswer]}</span>
                          </p>
                          <p className="text-gray-300 mt-2 italic">{wrong.question.explanation}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={handleRestart}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold flex-1 py-6 rounded-full shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/70 transition-all hover:scale-105 text-lg"
                >
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Try Again
                </Button>
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="flex-1 py-6 rounded-full border-white/20 hover:bg-white/10 text-white font-bold text-lg"
                >
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
}

