import { ReactNode } from 'react';
export type AuthUser = {
  id: number;
  name: string;
  email: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type AuthPageProps = {
  title: string;
  subtitle: string;
  footer: ReactNode;
  children: ReactNode;
};