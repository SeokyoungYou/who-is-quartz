import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Home from "./Routes/Home";
import QuizScreen from "./Routes/QuizScreen";
import ResultScreen from "./Routes/ResultScreen";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  width: 100vw;
  height: 100vh;
`;
function App() {
  return (
    <Wrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/quiz/:id" element={<QuizScreen />} />
          <Route path="/result" element={<ResultScreen />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Wrapper>
  );
}

export default App;
