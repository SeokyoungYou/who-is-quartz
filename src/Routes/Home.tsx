import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { currRouteState, Quiz, quizDataState, routesState } from "../atom";
import HomeIcons from "../Components/HomeIcons";

// Style Component
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  font-size: 68px;
  font-weight: 700;
  margin-bottom: 5px;
`;

const StartBtn = styled.button`
  background-color: ${(props) => props.theme.btnColor};
  border: none;
  padding: 15px;
  font-size: 24px;
  padding-left: 80px;
  padding-right: 80px;
  border-radius: 20px;
  cursor: pointer;
`;

function Home() {
  const navigate = useNavigate();
  const routes = useRecoilValue<string[]>(routesState);
  const [currRoute, setCurrRoute] = useRecoilState<number>(currRouteState);

  // Navigation logic
  useEffect(() => {
    setCurrRoute(0);
  });
  const startClicked = () => {
    navigate(`${routes[currRoute]}`);
    setCurrRoute((prev) => prev + 1);
  };

  return (
    <Wrapper>
      <Title>Who is Quartz?</Title>
      <span>
        어린 시절 쌍둥이들의 사진을 보고 누가 서경(Quartz)인지 맞춰보세요!
      </span>
      <HomeIcons />
      <div style={{ height: "15px" }}>
        {/* Load start button after route state loaded*/}
        {routes.length === 0 ? (
          <span>Loading</span>
        ) : (
          <StartBtn onClick={startClicked}>Start</StartBtn>
        )}
      </div>
    </Wrapper>
  );
}

export default Home;
