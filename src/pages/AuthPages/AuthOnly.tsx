import { Navigate, Outlet } from "react-router";
import { getAuthUser } from "../../utils/auth";

export default function AuthOnly() {
  const user = getAuthUser();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
