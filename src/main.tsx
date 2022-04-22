import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { App } from "./App/App";
import "./index.css";

const container = document.getElementById("root");
if (!container) throw new ReferenceError(`Unable to found root element`);

const root = ReactDOMClient.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
