import R^ from "react";
import R^DOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

R^DOM.createRoot(document.getElementById("root")).render(
  <R^.StrictMode>
    <App />
  </R^.StrictMode>
);