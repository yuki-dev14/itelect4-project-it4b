import { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import useUiStore from "../store/uiStore";

export default function Layout() {
  // Read the current auth username and theme state.
  const username = useAuthStore((state) => state.username);
  const logout = useAuthStore((state) => state.logout);
  const darkMode = useUiStore((state) => state.darkMode);
  const toggleDarkMode = useUiStore((state) => state.toggleDarkMode);
  const navigate = useNavigate();

  // Apply the dark class to the page body whenever the theme changes.
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Clear session and return to login.
  const handleLogout = (): void => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <nav className="border-b border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
        <div className="mx-auto flex max-w-6xl items-center gap-5 px-6 py-4 text-sm">
          <span className="mr-3 font-semibold tracking-tight text-slate-900 dark:text-slate-50">Lost &amp; Found</span>
          <NavLink to="/" className={({ isActive }) => isActive ? "font-semibold text-slate-950 dark:text-white" : "hover:text-slate-950 dark:hover:text-white"}>Home</NavLink>
          <NavLink to="/items" className={({ isActive }) => isActive ? "font-semibold text-slate-950 dark:text-white" : "hover:text-slate-950 dark:hover:text-white"}>Items</NavLink>
          <NavLink to="/claims" className={({ isActive }) => isActive ? "font-semibold text-slate-950 dark:text-white" : "hover:text-slate-950 dark:hover:text-white"}>Claims</NavLink>
          <NavLink to="/profile" className={({ isActive }) => isActive ? "font-semibold text-slate-950 dark:text-white" : "hover:text-slate-950 dark:hover:text-white"}>Profile</NavLink>
          <span className="ml-auto border-l border-slate-200 pl-5 text-slate-500 dark:border-slate-700 dark:text-slate-300">{username}</span>
          <button onClick={toggleDarkMode} className="rounded-md border border-slate-300 bg-slate-100 px-3 py-1.5 font-medium text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700">
            {darkMode ? "Light mode" : "Dark mode"}
          </button>
          <button onClick={handleLogout} className="rounded-md border border-slate-300 px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">Logout</button>
        </div>
      </nav>
      <main className="mx-auto mt-6 max-w-6xl">
        <Outlet />
      </main>
    </div>
  );
}
