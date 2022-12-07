import React, { createContext, useState } from "react";
import { QuizI, Score } from "../atom";

const QuizContext = React.createContext({
  localQuiz: null,
}) as React.Context<QuizContextI>;
QuizContext.displayName = "QuizContext";

interface QuizContextI {
  localQuiz: QuizI | null;
}
interface QuizContextProviderProps {
  children: React.ReactNode;
}

export const QuizContextProvider: React.FC<QuizContextProviderProps> = ({
  children,
}) => {
  const [localQuiz, setLocalQuiz] = useState<QuizI | null>(null); // quiz from DB

  // scores: 모든 문제에 대한 score


  const updateLocalQuiz =()=>{
    // quiz array 에서 local quiz data 가져오는 방법
  }


  const context = { localQuiz: null };
  return (
    <QuizContext.Provider value={context}>{children}</QuizContext.Provider>
  );
};
