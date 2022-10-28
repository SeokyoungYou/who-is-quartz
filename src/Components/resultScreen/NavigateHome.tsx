import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ToHome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  margin-top: 20px;
`;
interface NavigateHomeProps {
  setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}
const NavigateHome: React.FC<NavigateHomeProps> = ({ setIsSubmit }) => {
  const navigate = useNavigate();

  // Navigate to home
  const homeClicked = () => {
    navigate(`/`);
    setIsSubmit(false);
  };
  return (
    <ToHome onClick={homeClicked}>
      <FontAwesomeIcon
        icon={solid("home")}
        style={{ fontSize: "32px", cursor: "pointer" }}
      />
      <h1>시작페이지로 가기</h1>
    </ToHome>
  );
};

export default NavigateHome;
