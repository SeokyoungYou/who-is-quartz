import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  currRouteState,
  QuizI,
  quizDataState,
  routesSelctor,
  Score,
  scoreState,
} from "../../atom";
import QuizBtns from "../../components/quizScreen/QuizBtns";
import QuizComp from "../../components/quizScreen/QuizComp";
import { useQuiz } from "../../hooks/use-quiz";

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  @media screen and (max-width: 500px) {
    margin-bottom: 5px;
  }
`;
const Title = styled.h1`
  font-size: 32px;
  font-weight: 500;
`;

export interface PointerEvent {
  "pointer-events"?: string;
}

interface QuizContextI {
  localQuiz: QuizI | null;
}
export const QuizContext = React.createContext({
  localQuiz: null,
}) as React.Context<QuizContextI>;
QuizContext.displayName = "QuizContext";

interface QuizProps {
  children: React.ReactNode;
}

interface ChildProps {
  children: React.ReactNode;
}

export const Quiz: React.FC<QuizProps> = ({ children }) => {
  // routes info
  const navigate = useNavigate();
  const routes = useRecoilValue(routesSelctor);

  const { pathname } = useLocation();
  const quizId = pathname.split("/")[2];
  const currRoute = useRecoilValue<number>(currRouteState);
  // quiz info
  const quiz = useRecoilValue<QuizI[]>(quizDataState);
  const [currQiuz, setCurrQuiz] = useState<QuizI>(quiz[currRoute]);
  // scores info
  const [scores, setScores] = useRecoilState<Score[]>(scoreState);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [localScore, setLocalScore] = useState<Score>({});
  // Handle Img Background: color and pointer-event
  const [pointerEvent, setPointerEvent] = useState<PointerEvent>({});

  // After Submit Btn Clicked: Unable touch and fetch scores
  useEffect(() => {
    if (Object.keys(localScore).length !== 0) {
      setPointerEvent({ "pointer-events": "none" });
      setCorrect(null);
      setScores((prev) => [...prev, localScore]);
    }
  }, [localScore]);

  // After Next Btn Clicked: Initialize for next quiz
  useEffect(() => {
    setCurrQuiz(quiz[currRoute]);
    if (routes[currRoute] === "/result") {
      navigate(`/result`, { state: { isFromHome: false } });
    } else {
      navigate(`${routes[currRoute]}`);
    }
    setLocalScore({});
    setPointerEvent({});
  }, [currRoute]);
  return (
    <QuizContext.Provider value={{ localQuiz: currQiuz }}>
      {children}
      <QuizComp
        pointerEvent={pointerEvent}
        currQiuz={currQiuz}
        setCorrect={setCorrect}
      />
      <QuizBtns
        localScore={localScore}
        correct={correct}
        setLocalScore={setLocalScore}
      />
    </QuizContext.Provider>
  );
};

export const QuizTitle: React.FC<ChildProps> = ({ children }) => {
  const { localQuiz } = useQuiz();
  return (
    <TitleWrapper>
      <Title>{localQuiz?.quizName}</Title>
      <span>{children}</span>
    </TitleWrapper>
  );
};
export const QuizNextBtn: React.FC<ChildProps> = ({ children }) => {
  const { localQuiz } = useQuiz();
  return null;
};
