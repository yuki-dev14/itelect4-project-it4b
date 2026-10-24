// Shared type definitions for the app's core domain.
// These types keep the data model consistent across components and API calls.
export const ItemStatus = {
  Open: "open",
  Claimed: "claimed",
  Returned: "returned",
} as const;

export type ItemStatus = typeof ItemStatus[keyof typeof ItemStatus];
export type ItemType = "lost" | "found";

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
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// A found/lost item record.
export interface Item {
  id: string;
  title: string;
  description: string;
  type: ItemType;
  category: string;
  location: string;
  status: ItemStatus;
  reward: number;
  reportedBy?: string;
  dateReported: Date;
}

// A claim made for an item.
export interface Claim {
  id: string;
  itemId: string;
  claimantId: string;
  claimantEmail: string;
  claimDetails: string;
  status: ClaimStatus;
  verifiedBy?: string;
}

export type AiReadiness = "ready" | "almost" | "not-yet";

export interface AiReview {
  summary: string;
  strengths: string[];
  improvements: string[];
  readiness: AiReadiness;
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
export type ItemsById = Record<string, Item>;

/** JSON transport types keep dates as strings because the backend stores JSON strings. */
export type ItemApi = Omit<Item, "dateReported" | "reportedBy"> & {
  createdAt: string;
  userId?: string;
};
export type NewItemInput = Omit<Item, "id" | "dateReported" | "reportedBy">;
export type NewClaimApiInput = Pick<Claim, "itemId" | "claimantEmail" | "claimDetails">;