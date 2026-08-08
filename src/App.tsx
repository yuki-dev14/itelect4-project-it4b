// src/App.tsx
import { useEffect, useRef, useState } from "react";
import UserCard from "./components/UserCard";
import ItemCard from "./components/ItemCard";
import ClaimSummary from "./components/ClaimSummary";
import CourseCard from "./components/CourseCard";
import SubmissionBadge from "./components/SubmissionBadge";
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
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const previousSearchText = usePrevious<string>(searchText);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setUser(mockUser);
      setItem(mockItem);
      setClaim(mockClaim);
      setClaimant(mockClaimant);
      setResponse(mockResponse);
      setIsLoading(false);
    }, 500);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

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

  const course = {
    code: "ITELECT4",
    title: "IT Elective 4",
    units: 3,
    semester: "1st Semester",
    status: "In progress",
  };

  return (
    <div className="min-h-screen bg-transparent px-4 py-6 text-slate-900 transition-colors dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 rounded-3xl border border-slate-200/80 bg-white/80 p-4 shadow-lg backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-violet-600 dark:text-violet-400">Campus Hub</p>
            <h1 className="mt-1 text-3xl font-semibold sm:text-4xl">Campus Lost & Found</h1>
          </div>
          <button
            onClick={() => setDarkMode((current) => !current)}
            className="rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            {darkMode ? "☀️ Light mode" : "🌙 Dark mode"}
          </button>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/70">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                ref={searchInputRef}
                value={searchText}
                onChange={handleSearchChange}
                placeholder="Search item"
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-violet-500 dark:border-slate-700 dark:bg-slate-900"
              />
              <div className="flex gap-2">
                <button
                  onClick={focusSearch}
                  className="rounded-xl bg-violet-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-violet-700"
                >
                  Focus search
                </button>
                <button
                  onClick={toggleDetails}
                  className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100"
                >
                  {showDetails ? "Hide details" : "Show details"}
                </button>
              </div>
            </div>

            {previousSearchText && (
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Previous search: {previousSearchText}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <SubmissionBadge label="New claim" tone="success" />
            <SubmissionBadge label="Review pending" tone="warning" />
            <SubmissionBadge label="Status synced" />
          </div>
        </div>

        {isLoading && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
            <div className="mx-auto mb-3 h-3 w-24 animate-pulse rounded-full bg-violet-200 dark:bg-violet-900" />
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Loading your campus details...</p>
          </div>
        )}

        {!isLoading && user && item && claim && claimant && response && itemMatchesSearch && (
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-4">
              <UserCard user={user} onRoleChange={handleRoleChange} />
              <ItemCard item={item} onClaim={handleClaim} onUpdate={handleUpdate} />
            </div>
            <div className="space-y-4">
              <CourseCard course={course} />
              <CourseCard course={{ ...course, status: "Ready for review" }} variant="compact" />
              {showDetails && (
                <ClaimSummary claim={claim} claimant={claimant} response={response} />
              )}
            </div>
          </div>
        )}

        {!isLoading && !itemMatchesSearch && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center text-amber-800 dark:border-amber-900 dark:bg-amber-950/60 dark:text-amber-300">
            <p className="font-medium">No matching item found.</p>
            <p className="mt-1 text-sm">Try a different search term to view the lost item entry.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;