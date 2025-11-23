"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { QuizQuestion as QuizQuestionType } from "@/data/quizQuestions";
import { useQuizStore } from "@/store/quizStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
import { playBackButtonSound } from "@/lib/sounds";

interface QuizQuestionProps {
  question: QuizQuestionType;
}

export default function QuizQuestion({ question }: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const { selectAnswer, nextQuestion, currentQuestionIndex, questions } = useQuizStore();
  const totalQuestions = questions.length;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    playBackButtonSound();
    setSelectedAnswer(answerIndex);
    selectAnswer(answerIndex);
    setShowResult(true);
  };

  const handleNext = () => {
    playBackButtonSound();
    setSelectedAnswer(null);
    setShowResult(false);
    nextQuestion();
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-white/20 backdrop-blur-sm">
      <CardContent className="p-6 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-yellow-500/20 text-yellow-400 border-2 border-yellow-500/40 shadow-lg shadow-yellow-500/20">
                {question.difficulty.toUpperCase()}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4 leading-relaxed">
              {question.question}
            </h3>
          </div>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold px-6 py-2 rounded-full shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/70 transition-all hover:scale-105 whitespace-nowrap"
              >
                {currentQuestionIndex + 1 < totalQuestions
                  ? "Next →"
                  : "Finish ✓"}
              </Button>
            </motion.div>
          )}
        </div>

        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectOption = index === question.correctAnswer;

            return (
              <motion.button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all backdrop-blur-sm ${
                  showResult && isCorrectOption
                    ? "border-green-500 bg-gradient-to-r from-green-500/30 to-green-600/20 shadow-lg shadow-green-500/30"
                    : showResult && isSelected && !isCorrectOption
                    ? "border-red-500 bg-gradient-to-r from-red-500/30 to-red-600/20 shadow-lg shadow-red-500/30"
                    : isSelected
                    ? "border-yellow-400 bg-gradient-to-r from-yellow-400/30 to-yellow-500/20 shadow-lg shadow-yellow-400/30"
                    : "border-white/20 bg-white/5 hover:border-yellow-400/50 hover:bg-yellow-400/10 hover:shadow-md"
                } ${showResult ? "cursor-not-allowed" : "cursor-pointer"}`}
                whileHover={!showResult ? { scale: 1.02, x: 4 } : {}}
                whileTap={!showResult ? { scale: 0.98 } : {}}
              >
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">{option}</span>
                  {showResult && isCorrectOption && (
                    <CheckCircle2 className="h-6 w-6 text-green-400 drop-shadow-lg" />
                  )}
                  {showResult && isSelected && !isCorrectOption && (
                    <XCircle className="h-6 w-6 text-red-400 drop-shadow-lg" />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className={`p-5 rounded-xl border-2 backdrop-blur-sm ${
                isCorrect
                  ? "bg-gradient-to-r from-green-500/30 to-green-600/20 border-green-500/60 shadow-lg shadow-green-500/30"
                  : "bg-gradient-to-r from-red-500/30 to-red-600/20 border-red-500/60 shadow-lg shadow-red-500/30"
              }`}
            >
              <p className="font-bold text-lg text-white mb-2 flex items-center gap-2">
                {isCorrect ? (
                  <>
                    <span className="text-2xl">✓</span> Correct!
                  </>
                ) : (
                  <>
                    <span className="text-2xl">✗</span> Incorrect
                  </>
                )}
              </p>
              <p className="text-sm text-gray-200 leading-relaxed">{question.explanation}</p>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

