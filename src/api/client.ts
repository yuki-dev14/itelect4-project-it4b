import type { Claim, Item, ItemApi, ItemStatus, NewClaimApiInput } from "../types/app";

// Base URL for the local JSON server API.
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

// Reusable fetch wrapper for the API.
async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!response.ok) throw new Error(`API request failed: ${response.status}`);
  return response.json() as Promise<T>;
}

// Convert API string dates back into JavaScript Date objects.
function toItem(item: ItemApi): Item {
  return { ...item, dateReported: new Date(item.dateReported) };
}

// Fetch all items from the server.
export async function getItems(): Promise<Item[]> {
  const items = await request<ItemApi[]>("/items");
  return items.map(toItem);
}

// Fetch one item by id.
export async function getItem(id: number): Promise<Item> {
  return toItem(await request<ItemApi>(`/items/${id}`));
}

// Fetch all claims from the server.
export async function getClaims(): Promise<Claim[]> {
  return request<Claim[]>("/claims");
}

// Update an item's status to claimed or another state.
export async function updateItemStatus(itemId: number, status: ItemStatus): Promise<Item> {
  return toItem(await request<ItemApi>(`/items/${itemId}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  }));
}

// Submit a new claim to the API.
export async function createClaim(input: NewClaimApiInput): Promise<Claim> {
  return request<Claim>("/claims", {
    method: "POST",
    body: JSON.stringify({ ...input, status: "pending" }),
  });
}