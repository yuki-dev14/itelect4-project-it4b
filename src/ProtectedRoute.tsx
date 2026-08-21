import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "./store/authStore";

export default function ProtectedRoute() {
  const username = useAuthStore((s) => s.username);
  if (!username) return <Navigate to="/login" replace />;
  return <Outlet />;
}
