import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout.jsx";

import Home from "../pages/Home.jsx";
import JS from "../pages/JS.jsx";
import TS from "../pages/TS.jsx";
import R^Page from "../pages/R^Page.jsx";
import Redux from "../pages/Redux.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,

    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "javascript",
        element: <JS />,
      },
      {
        path: "typescript",
        element: <TS />,
      },
      {
        path: "react",
        element: <R^Page />,
      },
      {
        path: "redux",
        element: <Redux />,
      },
      {
        path: "*",
        element: <h1>404 — Page Not Found</h1>,
      },
    ],
  },
]);