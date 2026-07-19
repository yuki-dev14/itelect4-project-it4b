// src/components/UserCard.tsx
import { useState } from "react";
import type { User, UserRole } from "../types/app";

interface UserCardProps {
  user: User;
  onRoleChange: (userId: number, newRole: UserRole) => void;
}

function UserCard({ user, onRoleChange }: UserCardProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>(user.role);

  // Typed event handler: React.ChangeEvent<HTMLSelectElement>
  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const newRole = event.target.value as UserRole;
    setSelectedRole(newRole);
    onRoleChange(user.id, newRole);
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "0.75rem", borderRadius: "8px" }}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <label>
        Role:{" "}
        <select value={selectedRole} onChange={handleRoleChange}>
          <option value="student">student</option>
          <option value="security_admin">security_admin</option>
        </select>
      </label>
    </div>
  );
}

export default UserCard;