import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginAccount, registerAccount } from "../api/auth";
import useAuthStore from "../store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const login = useAuthStore((s) => s.login);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isRegister = pathname === "/register";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (isRegister) await registerAccount(name, email, password);
      const result = await loginAccount(email, password);
      login(result.user, result.token);
      navigate("/", { replace: true });
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-slate-500">Campus lost &amp; found</p>
        <h2 className="mb-6 text-2xl font-semibold text-slate-900">{isRegister ? "Create your account" : "Welcome back"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-700">Full name</Label>
              <Input id="name" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="h-auto rounded-md py-2.5" />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700">Email</Label>
            <Input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="h-auto rounded-md py-2.5" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-700">Password</Label>
            <Input id="password" type="password" autoComplete={isRegister ? "new-password" : "current-password"} minLength={isRegister ? 6 : undefined} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" className="h-auto rounded-md py-2.5" />
          </div>
          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          <Button type="submit" disabled={isSubmitting} className="h-auto w-full rounded-md bg-slate-900 py-2.5 text-white hover:bg-slate-700">
            {isSubmitting ? "Please wait..." : isRegister ? "Create account" : "Sign in"}
          </Button>
        </form>
        <p className="mt-5 text-center text-sm text-slate-600">
          {isRegister ? "Already have an account? " : "New to Lost & Found? "}
          <Link to={isRegister ? "/login" : "/register"} className="font-semibold text-slate-900 underline underline-offset-4">
            {isRegister ? "Sign in" : "Create an account"}
          </Link>
        </p>
      </div>
    </div>
  );
}
