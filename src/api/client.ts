import useAuthStore from "../store/authStore";
import type { AiReview, Claim, Item, ItemApi, NewClaimApiInput } from "../types/app";
import { API_BASE_URL } from "./config";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = useAuthStore.getState().token;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });

  const result = await response.json().catch(() => null) as (T & { message?: string }) | null;
  if (!response.ok) {
    throw new Error(result?.message ?? `API request failed: ${response.status}`);
  }
  if (result === null) throw new Error("The API returned an empty response");
  return result;
}

function toItem(item: ItemApi): Item {
  const { createdAt, userId, ...fields } = item;
  return { ...fields, reportedBy: userId, dateReported: new Date(createdAt) };
}

export async function getItems(): Promise<Item[]> {
  const items = await request<ItemApi[]>("/items");
  return items.map(toItem);
}

export async function getItem(id: string): Promise<Item> {
  return toItem(await request<ItemApi>(`/items/${id}`));
}

export async function getClaims(): Promise<Claim[]> {
  return request<Claim[]>("/claims");
}

export async function createClaim(input: NewClaimApiInput): Promise<Claim> {
  return request<Claim>("/claims", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function askAi(prompt: string): Promise<AiReview> {
  return request<AiReview>("/ai", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });
}