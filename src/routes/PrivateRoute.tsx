import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuthContext();
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
