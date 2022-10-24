import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div``;
const Title = styled.h1``;
function ResultScreen() {
  const navigate = useNavigate();
  // Navigate to home
  const homeClicked = () => {
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
    </Wrapper>
  );
}

export default ResultScreen;
