import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { NewsProvider } from "./Context/NewsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <NewsProvider>
    <App />
  </NewsProvider>
);
