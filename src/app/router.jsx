import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout.jsx";

import Home from "../pages/Home.jsx";
import JavaScript from "../pages/JavaScript.jsx";
import TypeScript from "../pages/TypeScript.jsx";
import ReactPage from "../pages/ReactPage.jsx";
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
        element: <JavaScript />,
      },
      {
        path: "typescript",
        element: <TypeScript />,
      },
      {
        path: "react",
        element: <ReactPage />,
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