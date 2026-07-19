export const ItemStatus = {
  Lost: "lost",
  Found: "found",
  Claimed: "claimed",
} as const;

export type ItemStatus = typeof ItemStatus[keyof typeof ItemStatus];

export const ClaimStatus = {
  Pending: "pending",
  Verified: "verified",
  Rejected: "rejected",
} as const;

export type ClaimStatus = typeof ClaimStatus[keyof typeof ClaimStatus];

export type UserRole = "student" | "security_admin";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface Item {
  id: number;
  title: string;
  description: string;
  status: ItemStatus;
  reportedBy: number; // User.id
  dateReported: string;
}

export interface Claim {
  id: number;
  itemId: number;
  claimantId: number; // User.id
  status: ClaimStatus;
  verifiedBy?: number;
}

/** Generic wrapper used by every function that returns a result. */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Utility types
export type ItemUpdate = Partial<Item>; // for editing an item
export type UserSummary = Pick<User, "id" | "name">; // lightweight display info
export type NewClaimInput = Omit<Claim, "id" | "status" | "verifiedBy">;
export type ItemsById = Record<number, Item>;