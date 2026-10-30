import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginAccount } from "../api/auth";
import useAuthStore from "../store/authStore";
import { authSchema } from "../schemas/authSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => loginAccount(email, password),
    onSuccess: (result) => {
      login(result.user, result.token);
      navigate("/", { replace: true });
    },
    onError: (err) => {
      setApiError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError(null);

    const parsed = authSchema.safeParse({ email, password });
    if (!parsed.success) {
      const formatted = parsed.error.format();
      setFieldErrors({
        email: formatted.email?._errors[0],
        password: formatted.password?._errors[0],
      });
      return;
    }

    setFieldErrors({});
    mutation.mutate();
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-slate-500">Campus lost &amp; found</p>
        <h2 className="mb-6 text-2xl font-semibold text-slate-900">Welcome back</h2>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-auto rounded-md py-2.5"
            />
            {fieldErrors.email && (
              <p className="text-sm text-red-600">{fieldErrors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-700">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              className="h-auto rounded-md py-2.5"
            />
            {fieldErrors.password && (
              <p className="text-sm text-red-600">{fieldErrors.password}</p>
            )}
          </div>
          {apiError && <p role="alert" className="text-sm text-red-700">{apiError}</p>}
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="h-auto w-full rounded-md bg-slate-900 py-2.5 text-white hover:bg-slate-700"
          >
            {mutation.isPending ? "Please wait..." : "Log In"}
          </Button>
        </form>
        <p className="mt-5 text-center text-sm text-slate-600">
          New to Lost &amp; Found?{" "}
          <Link to="/register" className="font-semibold text-slate-900 underline underline-offset-4">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

