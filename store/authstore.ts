"use client";

import { AuthUser } from "@/types/auth";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  status: "idle" | "loading" | "error";
  error: string | null;
};

type AuthActions = {
  start: () => void;
  setAuth: (payload: { user: AuthUser; token: string }) => void;
  setError: (error: string) => void;
  resetStatus: () => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      status: "idle",
      error: null,
      start: () => set({ status: "loading", error: null }),
      setAuth: ({ user, token }) =>
        set({ user, token, status: "idle", error: null }),
      setError: (error) => set({ error, status: "error" }),
      resetStatus: () => set({ status: "idle", error: null }),
      logout: () => set({ user: null, token: null, status: "idle", error: null }),
    }),
    {
      name: "vynspire-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    },
  ),
);
