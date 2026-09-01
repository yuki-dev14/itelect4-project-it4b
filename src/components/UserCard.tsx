// src/components/UserCard.tsx
import { useState } from "react";
import type { User, UserRole } from "../types/app";

interface UserCardProps {
  user: User;
  onRoleChange: (userId: number, newRole: UserRole) => void;
}

// Displays a user and lets the user change their role from a select box.
function UserCard({ user, onRoleChange }: UserCardProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>(user.role);

  // When the select changes, update the local state and notify the parent.
  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const newRole = event.target.value as UserRole;
    setSelectedRole(newRole);
    onRoleChange(user.id, newRole);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-600 dark:text-violet-400">User</p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">{user.name}</h3>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          {selectedRole}
        </span>
      </div>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{user.email}</p>
      <label className="mt-4 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
        <span>Role</span>
        <select
          value={selectedRole}
          onChange={handleRoleChange}
          className="rounded-lg border border-slate-300 bg-slate-50 px-2 py-1 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
        >
          <option value="student">student</option>
          <option value="security_admin">security_admin</option>
        </select>
      </label>
    </div>
  );
}

export default UserCard;