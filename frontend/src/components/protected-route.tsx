import { useUserStore } from "@/store/user-store";
import { Navigate } from "@tanstack/react-router";

export const ProtectedRoute = ({ children }) => {
  const token = useUserStore.getState().user?.accessToken;
  if (!token) {
    return <Navigate to='/login' />;
  }
  return children;
};
