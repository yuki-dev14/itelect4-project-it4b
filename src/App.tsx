// src/App.tsx
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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "2rem" }}>
      <h1>Campus Lost & Found</h1>

      <UserCard user={mockUser} onRoleChange={handleRoleChange} />
      <ItemCard item={mockItem} onClaim={handleClaim} onUpdate={handleUpdate} />
      <ClaimSummary claim={mockClaim} claimant={mockClaimant} response={mockResponse} />
    </div>
  );
}

export default App;