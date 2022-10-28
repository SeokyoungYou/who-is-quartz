import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  currRouteState,
  Quiz,
  quizDataState,
  routesSelctor,
  Score,
  scoreState,
} from "../atom";
import QuizBtns from "../components/quizScreen/QuizBtns";
import QuizComp from "../components/quizScreen/QuizComp";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
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

const QuizScreen: React.FC = () => {
  // routes info
  const navigate = useNavigate();
  const routes = useRecoilValue(routesSelctor);

  const { pathname } = useLocation();
  const quizId = pathname.split("/")[2];
  const currRoute = useRecoilValue<number>(currRouteState);
  // quiz info
  const quiz = useRecoilValue<Quiz[]>(quizDataState);
  const [currQiuz, setCurrQuiz] = useState<Quiz>(quiz[currRoute]);
  // scores info
  const [scores, setScores] = useRecoilState<Score[]>(scoreState);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [localScore, setLocalScore] = useState<Score>({});
  // Handle Img Background: color and pointer-event
  const [pointerEvent, setPointerEvent] = useState<PointerEvent>({});
  console.log(quizId, currRoute);
  // After Submit Btn Clicked: Notice answer and fetch scores
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
    <Wrapper>
      <TitleWrapper>
        <Title>{currQiuz.quizName}</Title>
        <span>답을 선택한 후 제출 버튼을 눌러주세요!</span>
      </TitleWrapper>
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
    </Wrapper>
  );
};

export default QuizScreen;
