import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { currRouteState } from "../../atom";
import { lightTheme } from "../../theme";
import { PointerEvent } from "../../routes/QuizScreen";

const Wrapper = styled.div`
  z-index: 99;
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 30px;
  @media screen and (max-width: 500px) {
    margin-bottom: 0px;
    align-items: center;
  }
`;
const Touchable = styled.div`
  width: 500px;
  height: 500px;
  @media screen and (max-width: 500px) {
    height: 160px;
    width: 160px;
  }
`;
interface BgColors {
  left: string;
  right: string;
}
interface QuizTouchableWrapperProps {
  correctAnswer: string;
  setCorrect: React.Dispatch<React.SetStateAction<boolean | null>>;
  pointerEvent: PointerEvent;
}
const QuizTouchableWrapper: React.FC<QuizTouchableWrapperProps> = ({
  correctAnswer,
  setCorrect,
  pointerEvent,
}) => {
  const currRoute = useRecoilValue<number>(currRouteState);
  const [bgColors, setBgColors] = useState<BgColors>({
    left: lightTheme.transparent,
    right: lightTheme.transparent,
  });

  useEffect(() => {
    setBgColors({
      left: lightTheme.transparent,
      right: lightTheme.transparent,
    });
  }, [currRoute]);

  // Click image logic: Set background colors and local correct value
  const imgClicked = (clickedPos: string) => {
    if (clickedPos === "left") {
      setBgColors({
        left: lightTheme.selectedColor,
        right: lightTheme.grey,
      });
    } else {
      setBgColors({
        left: lightTheme.grey,
        right: lightTheme.selectedColor,
      });
    }
    if (clickedPos === correctAnswer) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
  };
  return (
    <Wrapper>
      <Touchable
        onClick={imgClicked.bind(null, "left")}
        style={{ backgroundColor: bgColors.left, ...pointerEvent }}
      />
      <Touchable
        onClick={imgClicked.bind(null, "right")}
        style={{ backgroundColor: bgColors.right, ...pointerEvent }}
      />
    </Wrapper>
  );
};

export default QuizTouchableWrapper;
