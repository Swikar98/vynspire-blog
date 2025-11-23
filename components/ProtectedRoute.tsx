"use client";

import { Loader } from "@/components/Loader";
import { useAuth } from "@/hook/useAuth";
import { ProtectedRouteProps } from "@/types/protectedRoute";

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, status } = useAuth({ requireAuth: true });
  const checking = status === "loading" || !isAuthenticated;

  if (checking) {
    return <Loader message="Validating session..." fullScreen />;
  }

  return <>{children}</>;
};
