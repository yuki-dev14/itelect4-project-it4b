# GT2P1 Lost and Found App

This project is a simple web app for managing lost and found items on campus.

## What it does

- Shows a sample lost item
- Displays a user profile
- Shows a claim summary
- Allows basic item and claim actions in the UI

## Tech stack

- React
- TypeScript
- Vite

## How to run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open the local URL shown in the terminal.

## Build

To create a production build, run:

```bash
npm run build
```

## Types and utility types

This app uses simple TypeScript types to organize data:

- User: information about a person
- Item: details about a lost or found item
- Claim: a request to claim an item
- ApiResponse<T>: a generic wrapper for responses

It also uses utility types:

- Partial<Item>: allows updating only some fields of an item
- Pick<User, "id" | "name">: selects only the id and name from a user
- Omit<Claim, "id" | "status" | "verifiedBy">: removes some fields from a claim
- Record<number, Item>: creates a map of item IDs to items
