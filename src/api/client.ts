import type { Claim, Item, ItemApi, NewClaimApiInput } from "../types/app";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!response.ok) throw new Error(`API request failed: ${response.status}`);
  return response.json() as Promise<T>;
}

function toItem(item: ItemApi): Item {
  return { ...item, dateReported: new Date(item.dateReported) };
}

export async function getItems(): Promise<Item[]> {
  const items = await request<ItemApi[]>("/items");
  return items.map(toItem);
}

export async function getItem(id: number): Promise<Item> {
  return toItem(await request<ItemApi>(`/items/${id}`));
}

export async function getClaims(): Promise<Claim[]> {
  return request<Claim[]>("/claims");
}

export async function createClaim(input: NewClaimApiInput): Promise<Claim> {
  return request<Claim>("/claims", {
    method: "POST",
    body: JSON.stringify({ ...input, status: "pending" }),
  });
}