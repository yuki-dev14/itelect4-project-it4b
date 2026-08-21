import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ItemCard from "../components/ItemCard";
import { createClaim, getItems } from "../api/client";
import useUiStore from "../store/uiStore";
import type { ItemUpdate } from "../types/app";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const darkMode = useUiStore((state) => state.darkMode);
  const toggleDarkMode = useUiStore((state) => state.toggleDarkMode);
  const queryClient = useQueryClient();
  const { data: items, isLoading, isError } = useQuery({ queryKey: ["items"], queryFn: getItems });
  const claimMutation = useMutation({
    mutationFn: (itemId: number) => createClaim({ itemId, claimantId: 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["claims"] });
    },
  });

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const filteredItems = items?.filter((item) => item.title.toLowerCase().includes(searchText.toLowerCase()));
  const handleUpdate = (itemId: number, changes: ItemUpdate): void => {
    console.log("Item update requested", itemId, changes);
  };

  return (
    <div className="min-h-screen bg-transparent px-4 py-6 text-slate-900 dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-3xl border border-slate-200/80 bg-white/80 p-4 shadow-lg backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-violet-600 dark:text-violet-400">Campus Hub</p>
            <h1 className="mt-1 text-3xl font-semibold sm:text-4xl">Campus Lost &amp; Found</h1>
          </div>
          <button onClick={toggleDarkMode} className="rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-medium dark:border-slate-700 dark:bg-slate-800">
            {darkMode ? "Light mode" : "Dark mode"}
          </button>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input ref={searchInputRef} value={searchText} onChange={(event) => setSearchText(event.target.value)} placeholder="Search item" className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
          <button onClick={() => searchInputRef.current?.focus()} className="rounded-xl bg-violet-600 px-3 py-2 text-sm font-medium text-white">Focus search</button>
        </div>
        {isLoading && <p>Loading items...</p>}
        {isError && <p>Could not load items. Start the API with <code>npm run api</code>.</p>}
        {claimMutation.isSuccess && <p className="text-emerald-600">Claim submitted.</p>}
        {filteredItems?.length === 0 && <p>No matching item found.</p>}
        <div className="grid gap-4 lg:grid-cols-2">
          {filteredItems?.map((item) => (
            <ItemCard key={item.id} item={item} onClaim={(itemId) => claimMutation.mutate(itemId)} onUpdate={handleUpdate} />
          ))}
        </div>
      </div>
    </div>
  );
}
