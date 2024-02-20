import { create } from 'zustand'
import { type Question } from '../types'
import { persist } from 'zustand/middleware'
import FullData from '../data.json'

interface State {
  questions: Question[]
  initialQuestion: number
  resultsVisible: boolean
  touch: boolean
  fetchQuestions: (length: number) => void
  evaluateAnswer: (questionId: number, answer: number) => void
  goNextQuestion: () => void
  goPreviousQuestion: () => void
  reset: () => void
  showResults: () => void
  handleTouchStart: () => void
  handleTouchMove: () => void
  handleTouchEnd: (currentQuestionId: number, index: number) => void
}

export const useStore = create<State>()(persist((set, get) => ({
  questions: [],
  initialQuestion: 0,
  resultsVisible: false,
  touch: false,

  fetchQuestions: (length) => {
    const data = FullData
    const selectedQuestions = data.sort(() => Math.random() - 0.5).slice(0, length)
    set({ questions: selectedQuestions })
  },

  evaluateAnswer: (questionId, answer) => {
    const { questions } = get()
    const newQuestions = structuredClone(questions)
    const newQuestionIndex = newQuestions.findIndex(q => q.id === questionId)
    const newQuestion = newQuestions[newQuestionIndex]
    const answerIsCorrect = newQuestion.correctAnswer === answer

    newQuestions[newQuestionIndex] = {
      ...newQuestion,
      answerIsCorrect,
      selectedAnswer: answer
    }

    set({ questions: newQuestions })
  },

  goNextQuestion: () => {
    const { initialQuestion, questions } = get()
    const nextQuestion = initialQuestion + 1
    if (nextQuestion < questions.length) { set({ initialQuestion: nextQuestion }) }
  },

  goPreviousQuestion: () => {
    const { initialQuestion } = get()
    const previousQuestion = initialQuestion - 1
    if (previousQuestion >= 0) { set({ initialQuestion: previousQuestion }) }
  },

  reset: () => {
    set({
      questions: [],
      initialQuestion: 0,
      resultsVisible: false
    })
  },

  showResults: () => {
    set({
      resultsVisible: true,
      initialQuestion: 0
    })
  },

  handleTouchStart: () => {
    const { touch } = get()
    if (!touch) { set({ touch: true }) }
  },

  handleTouchMove: () => {
    const { touch } = get()
    if (touch) { set({ touch: false }) }
  },

  handleTouchEnd (currentQuestionId, index) {
    const { touch, evaluateAnswer } = get()
    if (touch) { evaluateAnswer(currentQuestionId, index) }
  }
}), {
  name: 'questions'
}))
