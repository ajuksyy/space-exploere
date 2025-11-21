import { create } from "zustand";
import { QuizQuestion } from "@/data/quizQuestions";

interface QuizState {
  isOpen: boolean;
  currentQuestionIndex: number;
  score: number;
  selectedAnswers: number[];
  questions: QuizQuestion[];
  isFinished: boolean;
  openQuiz: () => void;
  closeQuiz: () => void;
  startQuiz: (questions: QuizQuestion[]) => void;
  selectAnswer: (answerIndex: number) => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  isOpen: false,
  currentQuestionIndex: 0,
  score: 0,
  selectedAnswers: [],
  questions: [],
  isFinished: false,
  openQuiz: () => set({ isOpen: true }),
  closeQuiz: () => set({ isOpen: false }),
  startQuiz: (questions) =>
    set({
      questions,
      currentQuestionIndex: 0,
      score: 0,
      selectedAnswers: [],
      isFinished: false,
    }),
  selectAnswer: (answerIndex) =>
    set((state) => {
      const newSelectedAnswers = [...state.selectedAnswers];
      newSelectedAnswers[state.currentQuestionIndex] = answerIndex;
      const currentQuestion = state.questions[state.currentQuestionIndex];
      const isCorrect = answerIndex === currentQuestion.correctAnswer;
      return {
        selectedAnswers: newSelectedAnswers,
        score: isCorrect ? state.score + 1 : state.score,
      };
    }),
  nextQuestion: () =>
    set((state) => {
      const nextIndex = state.currentQuestionIndex + 1;
      if (nextIndex >= state.questions.length) {
        return { isFinished: true };
      }
      return { currentQuestionIndex: nextIndex };
    }),
  resetQuiz: () =>
    set({
      currentQuestionIndex: 0,
      score: 0,
      selectedAnswers: [],
      isFinished: false,
    }),
}));

