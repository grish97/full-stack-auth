import { Navigate, Outlet } from "react-router-dom";

interface IPropType {
  isAuthenticated: boolean;
}

export default function PrivateRoutes(props: IPropType) {
  return props.isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" />;
}
