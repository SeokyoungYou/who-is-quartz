import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { currRouteState, Score } from "../../atom";
import { lightTheme } from "../../theme";

const BtnWrapper = styled.div`
  display: flex;

  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Notice = styled.span<NoticeProps>`
  font-size: 24px;
  color: ${(props) => props.fontColor};
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

interface NoticeProps {
  fontColor: string;
}
interface BtnProps {
  bgColor: string;
}

interface QuizBtnsProps {
  localScore: Score;
  correct: boolean | null;
  setLocalScore: React.Dispatch<React.SetStateAction<Score>>;
}
const QuizBtns: React.FC<QuizBtnsProps> = ({
  localScore,
  correct,
  setLocalScore,
}) => {
  const { pathname } = useLocation();
  const quizId = pathname.split("/")[2];
  const setCurrRoute = useSetRecoilState<number>(currRouteState);

  // Navigate to next quiz or result
  const nextBtnClicked = () => {
    setCurrRoute((prev) => prev + 1);
  };

  // Set local score
  const submitBtnClicked = () => {
    if (correct === null) {
      alert("정답을 선택해주세요");
    } else {
      setLocalScore({ [quizId]: correct });
    }
  };
  return (
    <>
      {Object.keys(localScore).length === 0 && (
        <RouteBtn onClick={submitBtnClicked} bgColor={lightTheme.bgColor}>
          정답 제출
        </RouteBtn>
      )}
      {Object.keys(localScore).length !== 0 && (
        <BtnWrapper>
          {localScore[quizId] && (
            <Notice fontColor={lightTheme.rightColor}>
              정답입니다 <FontAwesomeIcon icon={solid("face-smile")} />{" "}
            </Notice>
          )}
          {!localScore[quizId] && (
            <Notice fontColor={lightTheme.wrongColor}>
              오답입니다 <FontAwesomeIcon icon={solid("face-dizzy")} />{" "}
            </Notice>
          )}
          <RouteBtn onClick={nextBtnClicked} bgColor={lightTheme.btnColor}>
            Next
          </RouteBtn>
        </BtnWrapper>
      )}
    </>
  );
};
export default QuizBtns;
