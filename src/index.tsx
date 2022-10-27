import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { RecoilRoot } from "recoil";
import App from "./App";
import { lightTheme } from "./theme";
import GlobalStyleComp from "./components/GlobalStyleComp";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyleComp />
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
);
