export interface Question {
  id: number
  question: string
  code: string
  answers: string[]
  correctAnswer: number
  answerIsCorrect?: boolean
  selectedAnswer?: number
  resultsVisible?: boolean
  touch?: boolean
}
