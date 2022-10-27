import React from "react";
import styled from "styled-components";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { currRouteState, routesState } from "../atom";
import HomeIcons from "../components/homeScreen/HomeIcons";
import HomeButtons from "../components/homeScreen/HomeButtons";

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
  @media screen and (max-width: 500px) {
    font-size: 32px;
    text-align: center;
  }
`;

const Home: React.FC = () => {
  const routes = useRecoilValue<string[]>(routesState);
  const setCurrRoute = useSetRecoilState<number>(currRouteState);

  // Initialize global route
  setCurrRoute(0);

  return (
    <Wrapper>
      <Title>Who is Quartz?</Title>
      <span style={{ textAlign: "center" }}>
        어린 시절 쌍둥이들의 사진을 보고 누가 서경(Quartz)인지 맞춰보세요!
      </span>
      <HomeIcons />
      <div style={{ height: "15px" }}>
        {routes.length === 0 ? <span>Loading</span> : <HomeButtons />}
      </div>
    </Wrapper>
  );
};

export default Home;
