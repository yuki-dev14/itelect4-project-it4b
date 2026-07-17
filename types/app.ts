export enum ItemStatus {
  Lost = "lost",
  Found = "found",
  Claimed = "claimed",
}

export interface User {
  id: number;
  name: string;
  role: "student" | "security_admin";
}

export interface Item {
  id: number;
  title: string;
  status: ItemStatus;
  reportedBy: number; // User.id
}

export interface Claim {
  id: number;
  itemId: number;
  claimantId: number; // User.id
}

/** Generic wrapper used by every function that returns a result. */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

// Utility types
export type ItemUpdate = Partial<Item>; // for editing an item
export type UserSummary = Pick<User, "id" | "name">; // lightweight display info