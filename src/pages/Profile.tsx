import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const token = useAuthStore((s) => s.token);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      <p>Token: <code className="break-all">{token ?? 'none'}</code></p>
      <div className="mt-4">
        <button onClick={handleLogout} className="rounded bg-amber-500 px-3 py-1">Logout</button>
      </div>
    </div>
  );
}
