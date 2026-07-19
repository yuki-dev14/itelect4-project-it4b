import type { User, Item, Claim, ApiResponse, UserSummary } from "./types/app";
import { ItemStatus, ClaimStatus } from "./types/app";

// Mock data
const users: User[] = [
  { id: 1, name: "Juan dela Cruz", email: "juan@example.com", role: "student" },
  { id: 2, name: "Maria Santos", email: "maria@example.com", role: "security_admin" },
];

const items: Item[] = [
  {
    id: 1,
    title: "Black Umbrella",
    description: "Left near the library entrance",
    status: ItemStatus.Found,
    reportedBy: 2,
    dateReported: "2026-07-10",
  },
];

const claims: Claim[] = [];

/** Generic function: find any entity with an id, in any collection. */
function getById<T extends { id: number }>(list: T[], id: number): T | undefined {
  return list.find((entry) => entry.id === id);
}

/** Reports a new item. */
function reportItem(title: string, status: ItemStatus, reportedBy: number): ApiResponse<Item> {
  const item: Item = {
    id: items.length + 1,
    title,
    description: "",
    status,
    reportedBy,
    dateReported: new Date().toISOString().split("T")[0],
  };
  items.push(item);
  return { success: true, data: item };
}

/** Claims an item and immediately marks it as Claimed. */
function claimItem(itemId: number, claimantId: number): ApiResponse<Claim> {
  const claim: Claim = {
    id: claims.length + 1,
    itemId,
    claimantId,
    status: ClaimStatus.Pending,
  };
  claims.push(claim);

  const item: Item | undefined = getById(items, itemId);
  if (item) item.status = ItemStatus.Claimed;

  return { success: true, data: claim };
}

function toSummary(user: User): UserSummary {
  return { id: user.id, name: user.name };
}

// ----- Sample run -----
const report: ApiResponse<Item> = reportItem("Blue Water Bottle", ItemStatus.Found, 2);
console.log(report);

const claim: ApiResponse<Claim> = claimItem(report.data.id, 1);
console.log(claim);

const admin: User | undefined = getById(users, 2);
if (admin) console.log("Reported by:", toSummary(admin));