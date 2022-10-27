import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { currRouteState, routesState } from "../../atom";
import { lightTheme } from "../../theme";

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const StartBtn = styled.button<ButtonProps>`
  background-color: ${(props) => props.bgColor};
  border: none;
  padding: 15px;
  font-size: 24px;
  padding-left: 80px;
  padding-right: 80px;
  border-radius: 20px;
  cursor: pointer;
`;
interface ButtonProps {
  bgColor: string;
}

const HomeButtons: React.FC = () => {
  const navigate = useNavigate();
  const routes = useRecoilValue<string[]>(routesState);
  const currRoute = useRecoilValue<number>(currRouteState);

  const startClicked = () => {
    navigate(`${routes[currRoute]}`);
  };
  const resultClicked = () => {
    navigate(`/result`, { state: { isFromHome: true } });
  };
  return (
    <ButtonWrapper>
      <StartBtn bgColor={lightTheme.btnColor} onClick={startClicked}>
        Start
      </StartBtn>
      <StartBtn bgColor={lightTheme.grey} onClick={resultClicked}>
        점수 확인
      </StartBtn>
    </ButtonWrapper>
  );
};
export default HomeButtons;
