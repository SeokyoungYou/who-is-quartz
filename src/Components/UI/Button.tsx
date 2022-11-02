import styled from "styled-components";

const ButtonEl = styled.button<ButtonElI>`
  background-color: ${(props) => props.bgColor};
  border: none;
  padding: 15px;
  font-size: 24px;
  padding-left: 80px;
  padding-right: 80px;
  border-radius: 20px;
  cursor: pointer;
`;

interface ButtonElI {
  bgColor: string;
}
interface ButtonProps {
  children: React.ReactNode;
  bgColor: string;
  onClickHandler: () => void;
}
const Button: React.FC<ButtonProps> = ({
  children,
  bgColor,
  onClickHandler,
}) => {
  return (
    <ButtonEl bgColor={bgColor} onClick={onClickHandler}>
      {children}
    </ButtonEl>
  );
};

export default Button;
