import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ItemCard from "../components/ItemCard";
import { createClaim, getItems } from "../api/client";
import useUiStore from "../store/uiStore";
import type { ItemUpdate } from "../types/app";
import { claimSchema, type ClaimFormValues } from "../schemas/claimSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const darkMode = useUiStore((state) => state.darkMode);
  const toggleDarkMode = useUiStore((state) => state.toggleDarkMode);
  const queryClient = useQueryClient();
  const { data: items, isLoading, isError } = useQuery({ queryKey: ["items"], queryFn: getItems });
  const claimMutation = useMutation({
    mutationFn: (values: ClaimFormValues) => createClaim({ ...values, claimantId: 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["claims"] });
    },
  });
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<ClaimFormValues>({
    resolver: zodResolver(claimSchema),
    defaultValues: { itemId: 0, claimantEmail: "", claimDetails: "" },
  });

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const filteredItems = items?.filter((item) => item.title.toLowerCase().includes(searchText.toLowerCase()));
  const handleUpdate = (itemId: number, changes: ItemUpdate): void => {
    console.log("Item update requested", itemId, changes);
  };
  const handleClaimItem = (itemId: number): void => {
    setValue("itemId", itemId, { shouldValidate: true });
    document.getElementById("claimDetails")?.focus();
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
          <Label htmlFor="search" className="sr-only">Search items</Label>
          <Input id="search" ref={searchInputRef} value={searchText} onChange={(event) => setSearchText(event.target.value)} placeholder="Search item" className="h-auto rounded-xl py-2 dark:bg-slate-900" />
          <Button type="button" onClick={() => searchInputRef.current?.focus()} className="h-auto rounded-xl bg-violet-600 py-2 text-sm text-white hover:bg-violet-700">Focus search</Button>
        </div>
        <form onSubmit={handleSubmit((values) => { claimMutation.mutate(values); reset(); })} className="grid gap-4 rounded-2xl border border-violet-100 bg-violet-50/60 p-4 sm:grid-cols-2 dark:border-violet-900 dark:bg-violet-950/30">
          <div className="sm:col-span-2">
            <h2 className="text-lg font-semibold">Claim an item</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Tell us how you can identify it.</p>
          </div>
          <div>
            <Label htmlFor="itemId">Item</Label>
            <select id="itemId" {...register("itemId", { valueAsNumber: true })} className="mt-2 h-8 w-full rounded-lg border border-input bg-white px-2.5 text-sm dark:bg-slate-900">
              <option value={0}>Choose an item</option>
              {items?.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
            </select>
            {errors.itemId && <p className="mt-1 text-sm text-red-600">{errors.itemId.message}</p>}
          </div>
          <div>
            <Label htmlFor="claimantEmail">Campus email</Label>
            <Input id="claimantEmail" type="email" placeholder="you@campus.edu" {...register("claimantEmail")} className="mt-2" aria-invalid={!!errors.claimantEmail} />
            {errors.claimantEmail && <p className="mt-1 text-sm text-red-600">{errors.claimantEmail.message}</p>}
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="claimDetails">Identification details</Label>
            <textarea id="claimDetails" {...register("claimDetails")} placeholder="Mention a color, location, or unique feature..." className="mt-2 min-h-24 w-full rounded-lg border border-input bg-white px-2.5 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500 dark:bg-slate-900" aria-invalid={!!errors.claimDetails} />
            {errors.claimDetails && <p className="mt-1 text-sm text-red-600">{errors.claimDetails.message}</p>}
          </div>
          <Button type="submit" disabled={claimMutation.isPending} className="w-fit bg-violet-600 text-white hover:bg-violet-700">{claimMutation.isPending ? "Submitting..." : "Submit claim"}</Button>
        </form>
        {isLoading && <p>Loading items...</p>}
        {isError && <p>Could not load items. Start the API with <code>npm run api</code>.</p>}
        {claimMutation.isSuccess && <p className="text-emerald-600">Claim submitted.</p>}
        {filteredItems?.length === 0 && <p>No matching item found.</p>}
        <div className="grid gap-4 lg:grid-cols-2">
          {filteredItems?.map((item) => (
            <ItemCard key={item.id} item={item} onClaim={handleClaimItem} onUpdate={handleUpdate} />
          ))}
        </div>
      </div>
    </div>
  );
}
