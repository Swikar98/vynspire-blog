"use client";

import { useCallback, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { loginUser, registerUser } from "@/lib/auth";
import { useAuthStore } from "@/store/authstore";
import { LoginPayload, RegisterPayload } from "@/types/auth";

type AuthOptions = {
  requireAuth?: boolean;
  redirectTo?: string;
  redirectIfAuthenticated?: boolean;
};

export const useAuth = (options: AuthOptions = {}) => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    user,
    token,
    status,
    error,
    start,
    setAuth,
    setError,
    resetStatus,
    logout: logoutStore,
  } = useAuthStore();

  const isAuthenticated = Boolean(token);

  useEffect(() => {
    if (
      options.requireAuth &&
      !isAuthenticated &&
      status !== "loading" &&
      typeof window !== "undefined"
    ) {
      const redirectTarget = options.redirectTo ?? "/login";
      const next = encodeURIComponent(pathname);
      router.replace(`${redirectTarget}?next=${next}`);
    }
  }, [
    options.requireAuth,
    options.redirectTo,
    isAuthenticated,
    status,
    router,
    pathname,
  ]);

  useEffect(() => {
    if (
      options.redirectIfAuthenticated &&
      isAuthenticated &&
      typeof window !== "undefined"
    ) {
      router.replace(options.redirectTo ?? "/dashboard");
    }
  }, [
    options.redirectIfAuthenticated,
    isAuthenticated,
    router,
    options.redirectTo,
  ]);

  const login = useCallback(
    async (payload: LoginPayload) => {
      try {
        start();
        const result = await loginUser(payload);
        setAuth(result);
        return result;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unable to login right now.";
        setError(message);
        throw new Error(message);
      }
    },
    [setAuth, setError, start],
  );

  const register = useCallback(
    async (payload: RegisterPayload) => {
      try {
        start();
        const result = await registerUser(payload);
        setAuth(result);
        return result;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unable to register right now.";
        setError(message);
        throw new Error(message);
      }
    },
    [setAuth, setError, start],
  );

  const logout = useCallback(() => {
    logoutStore();
    router.replace("/login");
  }, [logoutStore, router]);

  return {
    user,
    token,
    status,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    resetStatus,
  };
};
