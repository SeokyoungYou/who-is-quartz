import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { currRouteState, routesSelctor } from "../../atom";
import { lightTheme } from "../../theme";
import Button from "../UI/Button";

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const HomeButtons: React.FC = () => {
  const navigate = useNavigate();
  const routes = useRecoilValue(routesSelctor);
  const currRoute = useRecoilValue<number>(currRouteState);

  const startClicked = () => {
    navigate(`${routes[currRoute]}`);
  };
  const resultClicked = () => {
    navigate(`/result`, { state: { isFromHome: true } });
  };
  return (
    <ButtonWrapper>
      <Button bgColor={lightTheme.btnColor} onClickHandler={startClicked}>
        Quiz 1
      </Button>
      <Button bgColor={lightTheme.btnColor} onClickHandler={startClicked}>
        Quiz 2
      </Button>
      <Button bgColor={lightTheme.grey} onClickHandler={resultClicked}>
        점수 확인
      </Button>
    </ButtonWrapper>
  );
};
export default HomeButtons;
