import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import { postDBdata } from "../../firebase/dbFuntions";

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;
const Input = styled.input`
  border: none;
  padding: 10px;
  width: 200px;
`;
const SubmitBtn = styled.input`
  border: none;
  padding: 10px;
`;
const UserResult = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 500px) {
    font-size: 12px;
  }
`;

interface UserResultCompProps {
  countCorrect: number;
  setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  getDBUsers(): Promise<void>;
}

const UserResultComp: React.FC<UserResultCompProps> = ({
  countCorrect,
  setIsSubmit,
  getDBUsers,
}) => {
  const [user, setUser] = useState<string>("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setUser(value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postDBdata(user, countCorrect);
    setUser("");
    setIsSubmit(true);
    getDBUsers();
  };
  return (
    <UserResult>
      <span>
        내 결과를 제출하고 다른 사람들의 결과를 함께 확인해보세요!{" "}
        <FontAwesomeIcon icon={solid("arrow-down")} />{" "}
      </span>
      <Form onSubmit={onSubmit}>
        <Input
          required
          maxLength={8}
          value={user}
          onChange={onChange}
          type="text"
          placeholder="닉네임을 작성해주세요."
        />
        <SubmitBtn type="submit" value="결과 제출하기" />
      </Form>
    </UserResult>
  );
};
export default UserResultComp;
