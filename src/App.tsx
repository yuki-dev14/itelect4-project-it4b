// src/App.tsx
import { useEffect, useRef, useState } from "react";
import UserCard from "./components/UserCard";
import ItemCard from "./components/ItemCard";
import ClaimSummary from "./components/ClaimSummary";
import {
  ItemStatus,
  ClaimStatus,
  type User,
  type UserRole,
  type Item,
  type Claim,
  type UserSummary,
  type ApiResponse,
  type ItemUpdate,
  type NewClaimInput,
  type ItemsById,
} from "./types/app";

function useToggle(initialValue: boolean): [boolean, () => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = (): void => {
    setValue((currentValue) => !currentValue);
  };

  return [value, toggle];
}

function usePrevious<T>(value: T): T | undefined {
  const valueRef = useRef<T | undefined>(undefined);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  return valueRef.current;
}

// Mock data
const mockUser: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "student",
};

const mockItem: Item = {
  id: 1,
  title: "Black Umbrella",
  description: "Left near the library entrance",
  status: ItemStatus.Found,
  reportedBy: 2,
  dateReported: "2026-07-10",
};

const mockClaim: Claim = {
  id: 1,
  itemId: 1,
  claimantId: 1,
  status: ClaimStatus.Verified,
  verifiedBy: 2,
};

const mockClaimant: UserSummary = { id: 1, name: "Juan dela Cruz" };

const mockResponse: ApiResponse<Claim> = {
  success: true,
  data: mockClaim,
  message: "Claim verified by admin.",
};

// Demonstrates the Record utility type: a lookup table of items by id
const itemsById: ItemsById = {
  [mockItem.id]: mockItem,
};

// Demonstrates NewClaimInput (Omit<Claim, "id" | "status" | "verifiedBy">)
const draftClaim: NewClaimInput = {
  itemId: mockItem.id,
  claimantId: mockUser.id,
};

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [item, setItem] = useState<Item | null>(null);
  const [claim, setClaim] = useState<Claim | null>(null);
  const [claimant, setClaimant] = useState<UserSummary | null>(null);
  const [response, setResponse] = useState<ApiResponse<Claim> | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showDetails, toggleDetails] = useToggle(false);
  const previousSearchText = usePrevious<string>(searchText);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect((): void => {
    setUser(mockUser);
    setItem(mockItem);
    setClaim(mockClaim);
    setClaimant(mockClaimant);
    setResponse(mockResponse);
    setIsLoading(false);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchText(event.target.value);
  };

  const handleClaim = (itemId: number): void => {
    const item = itemsById[itemId];
    console.log(`Item claimed:`, item, "draft claim payload:", draftClaim);
  };

  const handleUpdate = (itemId: number, changes: ItemUpdate): void => {
    console.log(`Updating item ${itemId} with`, changes);
  };

  const handleRoleChange = (userId: number, newRole: UserRole): void => {
    console.log(`User ${userId} role changed to ${newRole}`);
  };

  const focusSearch = (): void => {
    searchInputRef.current?.focus();
  };

  const itemMatchesSearch = item?.title.toLowerCase().includes(searchText.toLowerCase()) ?? false;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "2rem" }}>
      <h1>Campus Lost & Found</h1>

      <input
        ref={searchInputRef}
        value={searchText}
        onChange={handleSearchChange}
        placeholder="Search item"
      />
      <button onClick={focusSearch}>Focus search</button>
      {previousSearchText && <p>Previous search: {previousSearchText}</p>}
      <button onClick={toggleDetails}>{showDetails ? "Hide details" : "Show details"}</button>

      {isLoading && <p>Loading...</p>}
      {!isLoading && user && item && claim && claimant && response && itemMatchesSearch && (
        <>
          <UserCard user={user} onRoleChange={handleRoleChange} />
          <ItemCard item={item} onClaim={handleClaim} onUpdate={handleUpdate} />
          {showDetails && (
            <ClaimSummary claim={claim} claimant={claimant} response={response} />
          )}
        </>
      )}
      {!isLoading && !itemMatchesSearch && <p>No matching item found.</p>}
    </div>
  );
}

export default App;