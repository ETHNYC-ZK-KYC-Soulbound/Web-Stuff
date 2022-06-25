import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "./App/App";
import Start from "./App/pages/Start/index";
import "./index.css";

const container = document.getElementById("root");
if (!container) throw new ReferenceError(`Unable to found root element`);

const root = ReactDOMClient.createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={<div>not found</div>}
        />
        <Route
          path="/"
          element={<App />}
        ></Route>
        <Route
          path="/kyc"
          element={<Start />}
        ></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
