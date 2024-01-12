import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home/Home";
import Layout from "./components/Layouts/Layout";
import Detalhes from "./pages/Detalhes/Detalhes";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/detalhes/:name",
        element: <Detalhes />
      }
    ]
  }
])