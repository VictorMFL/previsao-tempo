import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Horario from "./Components/Horario";

const router = createBrowserRouter([
  {
    path: "/previsao-tempo/",
    element: <App />,
  },
  {
    path: "/previsao-tempo/horario",
    element: <Horario />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
