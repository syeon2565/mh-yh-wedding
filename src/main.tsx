import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { initKakao } from "./utils/kakao";
import "./styles/global.css";

initKakao();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
