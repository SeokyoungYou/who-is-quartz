import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { Score, scoreState } from "../atom";
import { dbService } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { DocumentData } from "@google-cloud/firestore";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
`;
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
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const DBResults = styled.div``;
const Retry = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  margin-top: 20px;
`;
const ScrollWrapper = styled.div`
  background-color: white;
  /* width: 500px; */
  display: grid;
  height: 500px;
  grid-template-columns: repeat(5, 1fr);
  align-content: start;
  /* grid-template-columns: repeat(auto-fill, minmax(20%, auto)); */
  grid-gap: 30px;
  border-radius: 10px;
  padding: 10px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;
const UserWrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
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

  const [user, setUser] = useState<string>("");
  const [users, setUsers] = useState<DocumentData[]>([]);
  const [dbLoad, setDBload] = useState<boolean>(false);
  useEffect(() => {
    setDBload(false);
  }, []);
  useEffect(() => {
    setDBload(true);
  }, [users]);
  const getDBUsers = async () => {
    const querySnapshot = await getDocs(collection(dbService, "users"));
    const dbUsers: DocumentData[] = await querySnapshot.docs.map((doc) =>
      doc.data()
    );
    setUsers(dbUsers);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "users"), {
        user,
        score: countCorrect,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setUser("");
    getDBUsers();
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setUser(value);
  };
  // Navigate to home
  const homeClicked = () => {
    resetScores();
    navigate(`/`);
  };
  return (
    <Wrapper>
      <Title>🎉 당신은 4 문제 중 {countCorrect} 문제를 맞췄습니다! 🎉</Title>
      <UserResult>
        <span>
          내 결과를 제출하고 다른 사람들의 결과를 함께 확인해보세요!{" "}
          <FontAwesomeIcon icon={solid("arrow-down")} />{" "}
        </span>
        <Form onSubmit={onSubmit}>
          <Input
            value={user}
            onChange={onChange}
            type="text"
            placeholder="이름(중복 가능)을 작성해주세요."
          />
          <SubmitBtn type="submit" value="결과 제출하기" />
        </Form>
      </UserResult>
      {dbLoad && (
        <DBResults>
          <ScrollWrapper>
            {users.map((user, i) => {
              return (
                <UserWrapper key={i}>
                  <h1>{user.user}</h1>
                  <h1>{user.score} 점</h1>
                </UserWrapper>
              );
            })}
          </ScrollWrapper>
        </DBResults>
      )}
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
