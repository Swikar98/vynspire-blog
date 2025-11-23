"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthPage } from "@/components/auth/AuthPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hook/useAuth";
import registerschema from "@/schema/register/register";



type RegisterFormValues = z.infer<typeof registerschema>;

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser, status, error, resetStatus } = useAuth({
    redirectIfAuthenticated: true,
    redirectTo: "/dashboard",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerschema),
    defaultValues: { name: "", email: "", password: "" },
  });

  useEffect(() => {
    return () => {
      resetStatus();
    };
  }, [resetStatus]);

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await registerUser(values);
      router.replace("/dashboard");
    } catch {
     console.log("Registration failed");
    }
  };

  return (
    <AuthPage
      title="Create your editorial HQ"
      subtitle="Join Vynspire Blog to draft, edit, and publish long-form content with confidence."
      footer={
        <p>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-slate-900">
            Sign in instead
          </Link>
        </p>
      }
    >
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-sm font-semibold text-slate-700">Full name</label>
          <Input className="mt-2" placeholder="Alex Editor" {...register("name")} />
          {errors.name && (
            <p className="mt-1 text-sm text-rose-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700">Email</label>
          <Input className="mt-2" placeholder="you@company.com" {...register("email")} />
          {errors.email && (
            <p className="mt-1 text-sm text-rose-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700">Password</label>
          <Input
            className="mt-2"
            type="password"
            placeholder="Create a strong password"
            {...register("password")}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-rose-600">
              {errors.password.message}
            </p>
          )}
        </div>

        {error && <p className="text-sm text-rose-600">{error}</p>}
        <Button type="submit" disabled={isSubmitting || status === "loading"}>
          {isSubmitting || status === "loading" ? "Creating account..." : "Create account"}
        </Button>
      </form>
    </AuthPage>
  );
}
