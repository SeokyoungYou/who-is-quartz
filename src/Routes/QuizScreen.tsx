import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  currRouteState,
  quizDataState,
  routesState,
  Score,
  scoreState,
} from "../atom";

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
const Title = styled.h1``;
const RouteBtn = styled.button<BtnProps>`
  background-color: ${(props) => props.bgColor};
  border: none;
  padding: 10px;
  font-size: 16px;
  padding-left: 40px;
  padding-right: 40px;
  border-radius: 20px;
  cursor: pointer;
`;
interface BtnProps {
  bgColor: string;
}

function QuizScreen() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const quizId = pathname.split("/")[2];
  const routes = useRecoilValue<string[]>(routesState);
  const [scores, setScores] = useRecoilState<Score[]>(scoreState);
  const [currRoute, setCurrRoute] = useRecoilState<number>(currRouteState);
  const [correct, setCorrect] = useState(false);
  const quiz = useRecoilValue(quizDataState);
  // console.log(quiz);

  const correctClicked = () => {
    setCorrect(true);
  };
  const worngClicked = () => {
    setCorrect(false);
  };
  const onSubmit = () => {
    // navigate to next quiz or result
    navigate(`${routes[currRoute]}`);
    setCurrRoute((prev) => prev + 1);
    // fetch score
    setScores((prev) => [...prev, { [quizId]: correct }]);
  };
  // console.log(scores);
  return (
    <Wrapper>
      <Title>QuizScreen</Title>
      <button onClick={correctClicked}>true</button>
      <button onClick={worngClicked}>false</button>
      <button onClick={onSubmit}>Clicked</button>
      <div>
        {/* <RouteBtn bgColor="rgba(0,0,0,0.2)">Prev</RouteBtn> */}
        <RouteBtn onClick={onSubmit} bgColor="#4D96FF">
          Next
        </RouteBtn>
      </div>
    </Wrapper>
  );
}

export default QuizScreen;
