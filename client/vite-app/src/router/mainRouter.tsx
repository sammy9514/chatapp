import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layout/Layout";
import { Homescreen } from "../Layout/Homescreen";
import { Signup } from "../auth/Signup";
import { Login } from "../auth/Login";
import { PrivateRoute } from "./PrivateRoute";

export const MainRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Homescreen />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
