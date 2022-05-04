import { Navigate, Outlet } from "react-router-dom";

interface IPropType {
  isAuthenticated: boolean;
}

export default function PublicRoutes(props: IPropType) {
  return props.isAuthenticated ? <Navigate to="/" /> : <Outlet />;
}
