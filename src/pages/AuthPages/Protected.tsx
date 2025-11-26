import { Navigate, Outlet } from "react-router";
import { getAuthUser } from "../../utils/auth";

export default function Protected() {
  const user = getAuthUser();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}



// export const logout = () => {
//   sessionStorage.removeItem("authUser");
//   window.location.href = "/signin";
// };
