import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { Score, scoreState } from "../atom";

const Wrapper = styled.div``;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
`;
const Results = styled.div``;
const Retry = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;
function ResultScreen() {
  const navigate = useNavigate();
  const resetScores = useResetRecoilState(scoreState);
  const scores = useRecoilValue<Score[]>(scoreState);
  // const scores = [{ 1: false }, { 2: true }, { 3: false }, { 4: false }];
  const countCorrect = scores.reduce((acc, score) => {
    const [answer] = Object.values(score);
    if (answer === true) return acc + 1;
    else return acc;
  }, 0);
  // console.log(scores);
  // Navigate to home
  const homeClicked = () => {
    resetScores();
    navigate("/");
  };
  return (
    <Wrapper>
      <Title>당신은 4 문제 중 {countCorrect} 문제를 맞췄습니다!</Title>
      <Results>
        <span>내 결과 업로드하고 순위 확인하기</span>
        <form>
          <input type="text" />
          <button type="submit">submit</button>
        </form>
        <div>Data from firebase</div>
      </Results>
      <Retry onClick={homeClicked}>
        <FontAwesomeIcon
          icon={solid("arrow-rotate-right")}
          style={{ fontSize: "32px", cursor: "pointer" }}
        />
        <h1>재도전하기</h1>
      </Retry>
    </Wrapper>
  );
}

export default ResultScreen;
