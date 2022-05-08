import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "hooks";

interface IPropType {
  allowedRoles: number[];
}

/**
 * To access route user have to authenticated
 */
export default function RequireAuth(props: IPropType) {
  const auth = useAuth();
  const location = useLocation();
  const isAllowed = auth.roles.find((roleId) =>
    props.allowedRoles.includes(roleId)
  );

  return isAllowed ? (
    <Outlet />
  ) : auth.isLogged ? (
    <Outlet /> /** Send to unauthorized page if logged but not access */
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
}
