"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthPage } from "@/components/auth/AuthPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hook/useAuth";
import schema from "@/schema/login/login";

type LoginFormValues = z.infer<typeof schema>;

const LOGIN_COPY = {
    title: "Welcome back, storyteller",
    subtitle:
        "Sign in to manage your drafts, publish new articles, and keep your editorial calendar on track.",
};

const renderFooter = () => (
    <p>
        Need an account?{" "}
        <Link href="/register" className="font-semibold text-slate-900">
            Register instead
        </Link>
    </p>
);

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const next = searchParams.get("next");
    const { login, status, error, resetStatus } = useAuth({
        redirectIfAuthenticated: true,
        redirectTo: "/dashboard",
    });
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(schema),
        defaultValues: { email: "", password: "" },
    });

    useEffect(() => {
        return () => {
            resetStatus();
        };
    }, [resetStatus]);

    const onSubmit = async (values: LoginFormValues) => {
        try {
            await login(values);
            router.replace(next ?? "/dashboard");
        } catch {
            console.log("Login failed");
        }
    };

    return (
        <AuthPage title={LOGIN_COPY.title} subtitle={LOGIN_COPY.subtitle} footer={renderFooter()}>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
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
                        placeholder="••••••••"
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
                    {isSubmitting ? "Signing in..." : "Sign in"}
                </Button>
            </form>
        </AuthPage>
    );
}

export default function LoginPage() {
    return (
        <Suspense
            fallback={
                <AuthPage title={LOGIN_COPY.title} subtitle={LOGIN_COPY.subtitle} footer={renderFooter()}>
                    <div className="flex min-h-[320px] items-center justify-center text-sm text-slate-500">
                        Preparing login form...
                    </div>
                </AuthPage>
            }
        >
            <LoginForm />
        </Suspense>
    );
}
