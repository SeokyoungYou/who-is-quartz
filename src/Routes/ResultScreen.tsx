import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { Score, scoreState } from "../atom";
import { DocumentData } from "@google-cloud/firestore";
import UserResultComp from "../components/resultScreen/UserResultComp";
import DBResultComp from "../components/resultScreen/DBResultComp";
import NavigateHome from "../components/resultScreen/NavigateHome";
import { getDBdata } from "../firebase/dbFuntions";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 20px;
  @media screen and (max-width: 500px) {
    font-size: 16px;
  }
`;

const ResultScreen: React.FC = () => {
  const [users, setUsers] = useState<DocumentData[]>([]); // Firebase DB data
  const scores = useRecoilValue<Score[]>(scoreState); // Global scores array
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const {
    state: { isFromHome },
  } = useLocation();
  const [isHome, setIsHome] = useState<boolean>(false);

  // If user is from home -> hide Title and UserResult components
  useEffect(() => {
    getDBUsers();
    if (isFromHome) {
      setIsHome(true);
    }
  }, [isFromHome]);

  // Calculate score form scoreState array
  const countCorrect: number = scores.reduce((acc, score) => {
    const [answer] = Object.values(score);
    if (answer === true) return acc + 1;
    else return acc;
  }, 0);

  // Get users form firebase DB
  const getDBUsers = async () => {
    const dbUsers: DocumentData[] = await getDBdata("users");
    setUsers(dbUsers);
  };

  return (
    <Wrapper>
      {isHome && <Title>점수 확인</Title>}
      {!isHome && (
        <>
          <Title>
            🎉 당신은 4 문제 중 {countCorrect} 문제를 맞췄습니다! 🎉
          </Title>
          {!isSubmit && (
            <UserResultComp
              countCorrect={countCorrect}
              setIsSubmit={setIsSubmit}
              getDBUsers={getDBUsers}
            />
          )}
        </>
      )}
      <DBResultComp users={users} />
      <NavigateHome setIsSubmit={setIsSubmit} />
    </Wrapper>
  );
};

export default ResultScreen;
