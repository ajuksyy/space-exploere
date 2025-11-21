"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { QuizQuestion as QuizQuestionType } from "@/data/quizQuestions";
import { useQuizStore } from "@/store/quizStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
import { playButtonClickSound } from "@/lib/sounds";

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
    playButtonClickSound();
    setSelectedAnswer(answerIndex);
    selectAnswer(answerIndex);
    setShowResult(true);
  };

  const handleNext = () => {
    playButtonClickSound();
    setSelectedAnswer(null);
    setShowResult(false);
    nextQuestion();
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <Card className="bg-black/50 border-white/20">
      <CardContent className="p-6 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 text-xs font-semibold rounded bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
              {question.difficulty.toUpperCase()}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-4">
            {question.question}
          </h3>
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
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  showResult && isCorrectOption
                    ? "border-green-500 bg-green-500/20"
                    : showResult && isSelected && !isCorrectOption
                    ? "border-red-500 bg-red-500/20"
                    : isSelected
                    ? "border-yellow-400 bg-yellow-400/20"
                    : "border-white/20 bg-white/5 hover:border-yellow-400/50 hover:bg-yellow-400/10"
                } ${showResult ? "cursor-not-allowed" : "cursor-pointer"}`}
                whileHover={!showResult ? { scale: 1.02 } : {}}
                whileTap={!showResult ? { scale: 0.98 } : {}}
              >
                <div className="flex items-center justify-between">
                  <span className="text-white">{option}</span>
                  {showResult && isCorrectOption && (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  )}
                  {showResult && isSelected && !isCorrectOption && (
                    <XCircle className="h-5 w-5 text-red-500" />
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
            className="space-y-4"
          >
            <div
              className={`p-4 rounded-lg ${
                isCorrect
                  ? "bg-green-500/20 border border-green-500/50"
                  : "bg-red-500/20 border border-red-500/50"
              }`}
            >
              <p className="font-semibold text-white mb-2">
                {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
              </p>
              <p className="text-sm text-gray-300">{question.explanation}</p>
            </div>
            <Button
              onClick={handleNext}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
            >
              {currentQuestionIndex + 1 < totalQuestions
                ? "Next Question"
                : "Finish Quiz"}
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

