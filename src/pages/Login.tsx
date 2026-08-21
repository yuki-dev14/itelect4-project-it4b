import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

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
          <label className="block text-sm font-medium text-slate-700">
            Username
            <input required value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2.5 outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600" />
          </label>
          <button className="w-full rounded-md bg-slate-900 px-4 py-2.5 font-medium text-white hover:bg-slate-700">Continue</button>
        </form>
      </div>
    </div>
  );
}
