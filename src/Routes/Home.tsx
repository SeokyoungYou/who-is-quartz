import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

// Style Component
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  font-size: 68px;
  font-weight: 700;
`;
const Icons = styled.div`
  font-size: 72px;
  width: 150px;
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
  margin-top: 20px;
`;
const StartBtn = styled.button``;
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

  return (
    <Wrapper>
      <Title>Who is Quartz?</Title>
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

      <StartBtn>Start</StartBtn>
    </Wrapper>
  );
}

export default Home;
