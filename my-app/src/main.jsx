// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { SocketProvider } from "./SocketContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SocketProvider>
    <App />
  </SocketProvider>
);
