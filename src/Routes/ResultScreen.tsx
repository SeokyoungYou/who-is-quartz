import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import styled from "styled-components";
import { scoreState } from "../atom";

const Wrapper = styled.div``;
const Title = styled.h1``;
function ResultScreen() {
  const navigate = useNavigate();
  const resetScores = useResetRecoilState(scoreState);
  // Navigate to home
  const homeClicked = () => {
    resetScores();
    navigate("/");
  };
  return (
    <Wrapper>
      <Title>ResultScreen</Title>

      <FontAwesomeIcon
        icon={solid("house")}
        onClick={homeClicked}
        style={{ fontSize: "32px", cursor: "pointer" }}
      />
      <h1>재도전하기</h1>
    </Wrapper>
  );
}

export default ResultScreen;
