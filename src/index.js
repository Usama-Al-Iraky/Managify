import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Provider from "./Context/State";

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider>
    <App />
  </Provider>
);
