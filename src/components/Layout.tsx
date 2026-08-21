import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function Layout() {
  const username = useAuthStore((state) => state.username);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = (): void => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-5 px-6 py-4 text-sm text-slate-600">
          <span className="mr-3 font-semibold tracking-tight text-slate-900">Lost &amp; Found</span>
          <NavLink to="/" className={({isActive}) => isActive ? 'font-semibold text-slate-950' : 'hover:text-slate-950'}>Home</NavLink>
          <NavLink to="/items" className={({isActive}) => isActive ? 'font-semibold text-slate-950' : 'hover:text-slate-950'}>Items</NavLink>
          <NavLink to="/profile" className={({isActive}) => isActive ? 'font-semibold text-slate-950' : 'hover:text-slate-950'}>Profile</NavLink>
          <span className="ml-auto border-l border-slate-200 pl-5 text-slate-500">{username}</span>
          <button onClick={handleLogout} className="rounded-md border border-slate-300 px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-50">Logout</button>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto mt-6">
        <Outlet />
      </main>
    </div>
  );
}
