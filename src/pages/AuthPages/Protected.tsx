import { Navigate, Outlet } from "react-router";

interface User {
  id: number;
  name: string;
  role: string;
}

interface ProtectedProps {
  allowedRoles?: string[];
}

export default function Protected({ allowedRoles }: ProtectedProps) {
  // For a regular admin
  // localStorage.setItem(
  //   "user",
  //   JSON.stringify({
  //     id: 1,
  //     name: "John Admin",
  //     role: "admin",
  //   })
  // );

  // For a super admin
  localStorage.setItem(
    "user",
    JSON.stringify({
      id: 2,
      name: "Alice SuperAdmin",
      role: "super-admin",
    })
  );

  const storedUser = localStorage.getItem("user");
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    // Not logged in → redirect to sign in
    return <Navigate to="/signin" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Logged in but not authorized for this route
    return <Navigate to="*" replace />;
  }

  // Allowed → render nested routes
  return <Outlet />;
}
