import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const RootLayout = lazy(() => import("@/layouts/RootLayout"));
const AuthLayout = lazy(() => import("@/layouts/AuthLayout"));
// const HomePage = lazy(() => import("@/pages/HomePage"));
const App = lazy(() => import("@/App"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const SignUpPage = lazy(() => import("@/pages/auth/SignUpPage"));

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <App /> },
      // later: { path: "/home", loader: requireAuth, element: <HomePage /> }
    ],
  },

  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUpPage /> },
    ],
  },

  {
    path: "*",
    loader: () => {
      throw new Response(null, { status: 302, headers: { Location: "/" } });
    },
  },
]);
