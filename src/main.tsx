// Copyright 2021 - 2024 Transflox LLC. All rights reserved.

import "@rainbow-me/rainbowkit/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import ReactGA from "react-ga4";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./components/App/App";
import "./styles/main.scss";

ReactGA.initialize("G-PDQD471S2P");
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
