import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { QuizI, quizDataState } from "./atom";
import Home from "./routes/Home";
import QuizScreen from "./routes/QuizScreen";
import ResultScreen from "./routes/ResultScreen";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
`;
// Qiuz JSON data in public folder
const url = `${process.env.PUBLIC_URL}/data.json`;

const App: React.FC = () => {
  const setQuiz = useSetRecoilState<QuizI[]>(quizDataState);
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setQuiz(json);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Wrapper>
      {/* Local url: http://localhost:3000/who-is-quartz */}
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/quiz/:id" element={<QuizScreen />} />
          <Route path="/result" element={<ResultScreen />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Wrapper>
  );
};

export default App;
