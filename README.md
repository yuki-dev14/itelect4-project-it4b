# ITElect4 Project

## Part 1 — TypeScript Basics (`src/index.ts`, `types/index.ts`)
A short script demonstrating TypeScript fundamentals: a `User` interface, a `Grade` type, and functions with full type annotations (`getUser`, `calculateGrade`, `formatCourse`).

## Part 2 — Campus Lost & Found Tracker (`src/app.ts`, `types/app.ts`)
A small console app modeling a campus lost-and-found system. Students can report found items, and other students can claim them.

### Interfaces / Types
- `User` — a student or security admin
- `Item` — a lost/found item report
- `Claim` — a claim linking a user to an item
- `ItemStatus` — enum: `Lost`, `Found`, `Claimed`
- `ApiResponse<T>` — generic interface wrapping function results
- `ItemUpdate` — `Partial<Item>`, for editing an item
- `UserSummary` — `Pick<User, "id" | "name">`, lightweight display info

**Generic function:** `getById<T extends { id: number }>(list: T[], id: number): T | undefined`

## How to run

```bash
npm install
npx ts-node src/index.ts
npx ts-node src/app.ts
```

Type-check only:
```bash
npx tsc --noEmit
```