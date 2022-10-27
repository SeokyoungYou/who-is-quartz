import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { Quiz, quizDataState, routesState } from "./atom";
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
  const [quiz, setQuiz] = useRecoilState<Quiz[]>(quizDataState);
  const [routes, setRoutes] = useRecoilState<string[]>(routesState);
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setQuiz(json);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    // ["/","quiz/"]  array 만들기
    if (quiz.length !== 0) {
      let quizRoutes: string[] = [];
      quiz.forEach((quiz) => {
        quizRoutes.push(`/quiz/${quiz.quizId}`);
      });
      quizRoutes.push("/result");
      setRoutes(quizRoutes);
    }
  }, [quiz]);

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
