import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import { IconDefinition, IconLookup } from "@fortawesome/fontawesome-svg-core";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { currRouteState, Quiz, quizDataState, routesState } from "../atom";

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
const Icons = styled.div`
  font-size: 72px;
  width: 150px;
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
  margin-top: 30px;
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

// Fontawsome icons
const BLANK_FACE_ICON = regular("face-meh-blank");
const SMILE_FACE_ICON = solid("face-smile");
const DIZZY_FACE_ICON = solid("face-dizzy");
// types
interface IconInterface {
  color: string;
  iconName: IconDefinition;
}

function Home() {
  const navigate = useNavigate();
  const routes = useRecoilValue<string[]>(routesState);
  const [currRoute, setCurrRoute] = useRecoilState<number>(currRouteState);
  const [firstIconState, setFirstIconState] = useState<boolean>(false);
  const [secondIconState, setSecondIconState] = useState<boolean>(false);

  let firstIcon: IconInterface = {
    color: "black",
    iconName: BLANK_FACE_ICON,
  };
  let secondIcon: IconInterface = {
    color: "black",
    iconName: BLANK_FACE_ICON,
  };
  // Toggle icons by clicking event
  if (firstIconState) {
    firstIcon.color = "#6BCB77";
    firstIcon.iconName = SMILE_FACE_ICON;
  }
  if (secondIconState) {
    secondIcon.color = "#FF6B6B";
    secondIcon.iconName = DIZZY_FACE_ICON;
  }
  const toggleIcon = (icon: "first" | "second") => {
    if (icon === "first") {
      setFirstIconState((prev) => !prev);
    } else {
      setSecondIconState((prev) => !prev);
    }
  };
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
      <Icons>
        <FontAwesomeIcon
          icon={firstIcon.iconName}
          onClick={toggleIcon.bind(null, "first")}
          style={{ color: firstIcon.color, cursor: "pointer" }}
        />
        <FontAwesomeIcon
          icon={secondIcon.iconName}
          onClick={toggleIcon.bind(null, "second")}
          style={{ color: secondIcon.color, cursor: "pointer" }}
        />
      </Icons>
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
