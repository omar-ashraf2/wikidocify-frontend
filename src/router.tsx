import PrivateRoute from "@/routes/PrivateRoute";
import { lazy } from "react";
import { createBrowserRouter, redirect } from "react-router-dom";

const RootLayout = lazy(() => import("@/layouts/RootLayout"));
const AuthLayout = lazy(() => import("@/layouts/AuthLayout"));
const App = lazy(() => import("@/App"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const SignUpPage = lazy(() => import("@/pages/auth/SignUpPage"));
// const HomePage = lazy(() => import("@/pages/HomePage"));

const requireGuest = () => {
  const token = localStorage.getItem("access_token");
  if (token) {
    throw redirect("/");
  }
  return null;
};

const requireAuth = () => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw redirect("/login");
  }
  return null;
};

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        loader: requireAuth,
        element: (
          <PrivateRoute>
            <App />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        loader: requireGuest,
        element: <LoginPage />,
      },
      {
        path: "/signup",
        loader: requireGuest,
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: "*",
    loader: () => {
      throw redirect("/");
    },
  },
]);
