import { create } from "zustand";
import { QuizQuestion, Difficulty } from "@/data/quizQuestions";

interface WrongAnswer {
  question: QuizQuestion;
  selectedAnswer: number;
  correctAnswer: number;
}

interface QuizState {
  isOpen: boolean;
  currentQuestionIndex: number;
  score: number;
  selectedAnswers: number[];
  questions: QuizQuestion[];
  isFinished: boolean;
  selectedDifficulty: Difficulty | null;
  wrongAnswers: WrongAnswer[];
  openQuiz: () => void;
  closeQuiz: () => void;
  selectDifficulty: (difficulty: Difficulty) => void;
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
  selectedDifficulty: null,
  wrongAnswers: [],
  openQuiz: () => set({ isOpen: true }),
  closeQuiz: () => set({ isOpen: false, selectedDifficulty: null }),
  selectDifficulty: (difficulty) => set({ selectedDifficulty: difficulty }),
  startQuiz: (questions) =>
    set({
      questions,
      currentQuestionIndex: 0,
      score: 0,
      selectedAnswers: [],
      isFinished: false,
      wrongAnswers: [],
    }),
  selectAnswer: (answerIndex) =>
    set((state) => {
      const newSelectedAnswers = [...state.selectedAnswers];
      newSelectedAnswers[state.currentQuestionIndex] = answerIndex;
      const currentQuestion = state.questions[state.currentQuestionIndex];
      const isCorrect = answerIndex === currentQuestion.correctAnswer;
      
      let newWrongAnswers = [...state.wrongAnswers];
      if (!isCorrect) {
        newWrongAnswers.push({
          question: currentQuestion,
          selectedAnswer: answerIndex,
          correctAnswer: currentQuestion.correctAnswer,
        });
      }
      
      return {
        selectedAnswers: newSelectedAnswers,
        score: isCorrect ? state.score + 1 : state.score,
        wrongAnswers: newWrongAnswers,
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
      selectedDifficulty: null,
      wrongAnswers: [],
    }),
}));

