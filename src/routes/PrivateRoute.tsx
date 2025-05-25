import { LoadingPage } from "@/pages/fallback";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return <LoadingPage />;
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
