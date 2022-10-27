import styled from "styled-components";
import { PointerEvent } from "../../routes/QuizScreen";
import { Answer, Quiz } from "../../atom";
import QuizTouchableWrapper from "./QuizTouchableWrapper";

const QuizWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 500px) {
    margin-bottom: 20px;
  }
`;
const ImgWrapper = styled.div`
  position: absolute;
`;

const MultiImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 100px;
  @media screen and (max-width: 500px) {
    /* flex-direction: column; */
    gap: 10px;
    align-items: center;
  }
`;
const MultiImg = styled.img`
  height: 400px;
  width: 400px;
  object-fit: cover;
  @media screen and (max-width: 500px) {
    height: 150px;
    width: 150px;
  }
`;
const SingleImg = styled.img`
  object-fit: cover;
  height: 400px;
  width: 400px;
  @media screen and (max-width: 500px) {
    height: 150px;
    width: 150px;
  }
`;

interface QuizCompProps {
  pointerEvent: PointerEvent;
  currQiuz: Quiz;
  setCorrect: React.Dispatch<React.SetStateAction<boolean | null>>;
}
const QuizComp: React.FC<QuizCompProps> = ({
  pointerEvent,
  currQiuz,
  setCorrect,
}) => {
  // Get correctAnswer from JSON Data:
  let correctAnswer: string;
  const answer: Answer = currQiuz.images[0].answer;
  if (typeof answer !== "boolean") {
    correctAnswer = answer;
  } else {
    correctAnswer = answer ? "left" : "right";
  }

  return (
    <QuizWrapper>
      <QuizTouchableWrapper
        correctAnswer={correctAnswer}
        setCorrect={setCorrect}
        pointerEvent={pointerEvent}
      />
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
  );
};

export default QuizComp;
