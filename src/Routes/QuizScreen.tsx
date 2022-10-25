import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  currRouteState,
  Quiz,
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
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;
const Title = styled.h1`
  font-size: 32px;
  font-weight: 500;
`;
const QuizWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
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
const ImgWrapper = styled.div`
  position: absolute;
`;
const TouchableWrapper = styled.div`
  z-index: 99;
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 30px;
`;
const Touchable = styled.div`
  width: 500px;
  height: 500px;
`;
const MultiImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 100px;
`;
const MultiImg = styled.img`
  height: 400px;
  width: 400px;
  object-fit: cover;
`;
const SingleImg = styled.img`
  height: 400px;
  object-fit: cover;
  width: 400px;
  /* object-position: top; */
`;
const BtnWrapper = styled.div`
  display: flex;

  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
interface NoticeProps {
  fontColor: string;
}
const Notice = styled.span<NoticeProps>`
  font-size: 24px;
  color: ${(props) => props.fontColor};
`;
interface BtnProps {
  bgColor: string;
}
interface BgColors {
  left: string;
  right: string;
}
function QuizScreen() {
  // url and path
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const routes = useRecoilValue<string[]>(routesState); // global routes array
  const [currRoute, setCurrRoute] = useRecoilState<number>(currRouteState);
  // quiz
  const quizId = pathname.split("/")[2];
  const quiz = useRecoilValue<Quiz[]>(quizDataState);
  const [currQiuz, setCurrQuiz] = useState<Quiz>(quiz[currRoute]);
  // scores
  const [scores, setScores] = useRecoilState<Score[]>(scoreState);
  const [correct, setCorrect] = useState<boolean>(false);
  const [localScore, setLocalScore] = useState<Score | null>(null);
  // Handle Img Background: color and pointer-event
  const [bgColors, setBgColors] = useState<BgColors>({
    left: "rgba(0,0,0,0)",
    right: "rgba(0,0,0,0)",
  });
  const [pointerEvent, setPointerEvent] = useState({});

  // 1. Get correctAnswer from JSON Data:
  let correctAnswer: string;
  const answer: boolean | string = currQiuz.images[0].answer;
  if (typeof answer === "string") {
    correctAnswer = answer;
  } else {
    correctAnswer = answer ? "left" : "right";
  }
  // 3-2. After Submit Btn Clicked: Notice answer and fetch scores
  useEffect(() => {
    if (localScore) {
      setPointerEvent({ "pointer-events": "none" });
      // fetch score
      setScores((prev) => [...prev, localScore]);
    }
  }, [localScore]);
  // 4-2. After Next Btn Clicked: Initialize to next quiz
  useEffect(() => {
    setCurrQuiz(quiz[currRoute]);
    navigate(`${routes[currRoute]}`);
    setLocalScore(null);
    setBgColors({
      left: "rgba(0,0,0,0)",
      right: "rgba(0,0,0,0)",
    });
    setPointerEvent({});
  }, [currRoute]);

  // 2. Clicking image logic: Set background colors and local correct value
  const imgClicked = (clickedPos: string) => {
    if (clickedPos === "left") {
      setBgColors({
        left: "rgba(255,212,59,0.3)",
        right: "rgba(0,0,0,0.3)",
      });
    } else {
      setBgColors({
        left: "rgba(0,0,0,0.3)",
        right: "rgba(255,212,59,0.3)",
      });
    }
    if (clickedPos === correctAnswer) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
  };
  // 3-1. Set local score
  const submitBtnClicked = () => {
    setLocalScore({ [quizId]: correct });
  };
  // 4-1. navigate to next quiz or result
  const nextBtnClicked = () => {
    setCurrRoute((prev) => prev + 1);
  };

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>{currQiuz.quizName}</Title>
        <span>답을 선택한 후 제출 버튼을 눌러주세요!</span>
      </TitleWrapper>
      <QuizWrapper>
        <TouchableWrapper>
          <Touchable
            onClick={imgClicked.bind(null, "left")}
            style={{ backgroundColor: bgColors.left, ...pointerEvent }}
          />
          <Touchable
            onClick={imgClicked.bind(null, "right")}
            style={{ backgroundColor: bgColors.right, ...pointerEvent }}
          />
        </TouchableWrapper>
        <ImgWrapper>
          {currQiuz.images.length === 1 && (
            <SingleImg
              src={`${process.env.PUBLIC_URL}/${currQiuz.images[0].url}`}
            />
          )}
          {currQiuz.images.length === 2 && (
            <MultiImgWrapper>
              <MultiImg
                src={`${process.env.PUBLIC_URL}/${currQiuz.images[0].url}`}
              />
              <MultiImg
                src={`${process.env.PUBLIC_URL}/${currQiuz.images[1].url}`}
              />
            </MultiImgWrapper>
          )}
        </ImgWrapper>
      </QuizWrapper>
      <div>
        {!localScore && (
          <RouteBtn onClick={submitBtnClicked} bgColor="#FFD93D">
            정답 제출
          </RouteBtn>
        )}
        {localScore && (
          <BtnWrapper>
            {localScore[quizId] && (
              <Notice fontColor="#6BCB77">
                정답입니다 <FontAwesomeIcon icon={solid("face-smile")} />{" "}
              </Notice>
            )}
            {!localScore[quizId] && (
              <Notice fontColor="#FF6B6B">
                오답입니다 <FontAwesomeIcon icon={solid("face-dizzy")} />{" "}
              </Notice>
            )}
            <RouteBtn onClick={nextBtnClicked} bgColor="#4D96FF">
              Next
            </RouteBtn>
          </BtnWrapper>
        )}
      </div>
    </Wrapper>
  );
}

export default QuizScreen;
