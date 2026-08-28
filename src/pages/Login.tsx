import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const [username, setUsername] = useState("");
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username);
    navigate("/", { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-slate-500">Campus lost &amp; found</p>
        <h2 className="mb-6 text-2xl font-semibold text-slate-900">Welcome back</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Label htmlFor="username" className="text-slate-700">Username</Label>
          <Input id="username" required value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" className="h-auto rounded-md py-2.5" />
          <Button type="submit" className="h-auto w-full rounded-md bg-slate-900 py-2.5 text-white hover:bg-slate-700">Continue</Button>
        </form>
      </div>
    </div>
  );
}
