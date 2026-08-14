import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <nav className="bg-white/80 border-b p-4">
        <div className="max-w-6xl mx-auto flex gap-4">
          <NavLink to="/" className={({isActive}) => isActive ? 'font-semibold' : ''}>Home</NavLink>
          <NavLink to="/items" className={({isActive}) => isActive ? 'font-semibold' : ''}>Items</NavLink>
          <NavLink to="/profile" className={({isActive}) => isActive ? 'font-semibold' : ''}>Profile</NavLink>
          <NavLink to="/login" className={({isActive}) => isActive ? 'font-semibold' : ''}>Login</NavLink>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto mt-6">
        <Outlet />
      </main>
    </div>
  );
}
