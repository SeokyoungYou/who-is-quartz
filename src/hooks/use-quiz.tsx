import React from "react"
import { QuizContext } from "../components/quizScreen/Quiz"

export function useQuiz() {
    const context = React.useContext(QuizContext)
    if (context === undefined) {
      throw new Error('useQuiz must be used within a <Quiz />')
    }
    return context
  }