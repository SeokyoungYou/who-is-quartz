import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  width: 100vw;
  height: 100vh;
`;
function App() {
  return <Wrapper></Wrapper>;
}

export default App;
