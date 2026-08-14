import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // fake token
    login("token-123");
    navigate("/profile", { replace: true });
  };

  return (
    <div className="p-6 max-w-md">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="w-full rounded border px-3 py-2" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full rounded border px-3 py-2" />
        <div>
          <button className="rounded bg-violet-600 px-4 py-2 text-white">Sign in</button>
        </div>
      </form>
    </div>
  );
}
