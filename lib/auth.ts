"use client";

import { SEED_USER } from "@/constants/credeatial";
import { AuthUser, LoginPayload, RegisterPayload } from "@/types/auth";

const USERS_KEY = "vynspire-blog-users";

type StoredUser = AuthUser & { password: string };

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const ensureUsers = (): StoredUser[] => {
  if (typeof window === "undefined") {
    return [];
  }

  const existingRaw = window.localStorage.getItem(USERS_KEY);
  let users: StoredUser[] = existingRaw ? JSON.parse(existingRaw) : [];
  if (!users.some((user) => user.email === SEED_USER.email)) {
    users = [...users, { ...SEED_USER }];
    window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
  return users;
};

const persistUsers = (users: StoredUser[]) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const sanitizeUser = (user: StoredUser): AuthUser => ({
  id: user.id,
  email: user.email,
  name: user.name,
});

const createToken = (user: AuthUser) =>
  btoa(`${user.id}:${user.email}:${Date.now()}`);

export const demoCredentials = {
  email: SEED_USER.email,
  password: SEED_USER.password,
};

export async function registerUser(payload: RegisterPayload) {
  await delay(600);
  const users = ensureUsers();
  if (users.some((user) => user.email === payload.email)) {
    throw new Error("Email is already registered.");
  }

  const newUser: StoredUser = {
    id: Date.now(),
    name: payload.name,
    email: payload.email,
    password: payload.password,
  };

  const nextUsers = [...users, newUser];
  persistUsers(nextUsers);

  const sanitized = sanitizeUser(newUser);
  return {
    user: sanitized,
    token: createToken(sanitized),
  };
}

export async function loginUser(payload: LoginPayload) {
  await delay(500);
  const users = ensureUsers();
  const existing = users.find(
    (user) =>
      user.email.toLowerCase() === payload.email.toLowerCase() &&
      user.password === payload.password,
  );

  if (!existing) {
    throw new Error("Invalid email or password.");
  }

  const sanitized = sanitizeUser(existing);
  return {
    user: sanitized,
    token: createToken(sanitized),
  };
}
