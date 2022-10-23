import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { Score, scoreState } from "../atom";

const Wrapper = styled.div``;
const Title = styled.h1``;
function QuizScreen() {
  const { pathname } = useLocation();
  const quizId = pathname.split("/")[2];
  const [scores, setScores] = useRecoilState<Score[]>(scoreState);
  const [correct, setCorrect] = useState(false);

  const correctClicked = () => {
    setCorrect(true);
  };
  const worngClicked = () => {
    setCorrect(false);
  };
  const onSubmit = () => {
    setScores((prev) => [...prev, { [quizId]: correct }]);
  };
  console.log(scores);
  return (
    <Wrapper>
      <Title>QuizScreen</Title>
      <button onClick={correctClicked}>true</button>
      <button onClick={worngClicked}>false</button>
      <button onClick={onSubmit}>Clicked</button>
    </Wrapper>
  );
}

export default QuizScreen;
