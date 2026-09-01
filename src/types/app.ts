// Shared type definitions for the app's core domain.
// These types keep the data model consistent across components and API calls.
export const ItemStatus = {
  // Reserved for future item lifecycle states; not all are used in the current UI flow.
  Lost: "lost",
  Found: "found",
  Claimed: "claimed",
} as const;

export type ItemStatus = typeof ItemStatus[keyof typeof ItemStatus];

export const ClaimStatus = {
  // Reserved for future moderation/approval workflow.
  Pending: "pending",
  Verified: "verified",
  Rejected: "rejected",
} as const;

export type ClaimStatus = typeof ClaimStatus[keyof typeof ClaimStatus];

// Reserved for later role expansion if admin or security roles are added.
export type UserRole = "student" | "security_admin";

// A user in the campus system.
export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

// A found/lost item record.
export interface Item {
  id: number;
  title: string;
  description: string;
  status: ItemStatus;
  reportedBy: number; // User.id
  dateReported: Date;
}

// A claim made for an item.
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

// Utility types for updates and smaller data objects.
export type ItemUpdate = Partial<Item>; // For editing only some item fields.
export type UserSummary = Pick<User, "id" | "name">; // Lightweight display info.
export type NewClaimInput = Omit<Claim, "id" | "status" | "verifiedBy">;
export type ItemsById = Record<number, Item>;

/** JSON transport types keep dates as strings because the backend stores JSON strings. */
export type ItemApi = Omit<Item, "dateReported"> & { dateReported: string };
export type NewItemInput = Omit<Item, "id" | "dateReported"> & { dateReported: string };
export type NewClaimApiInput = Omit<Claim, "id" | "status" | "verifiedBy"> & {
  claimantEmail: string;
  claimDetails: string;
};