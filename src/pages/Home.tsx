import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ItemCard from "../components/ItemCard";
import { createClaim, getItems } from "../api/client";
import { ItemStatus } from "../types/app";
import { claimSchema, type ClaimFormValues } from "../schemas/claimSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  // Search text for filtering the item list.
  const [searchText, setSearchText] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  // Fetch the current item list from the API.
  const { data: items, isLoading, isError } = useQuery({ queryKey: ["items"], queryFn: getItems });

  const claimMutation = useMutation({
    mutationFn: createClaim,
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["claims"] });
    },
  });

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<ClaimFormValues>({
    resolver: zodResolver(claimSchema),
    defaultValues: { itemId: "", claimantEmail: "", claimDetails: "" },
  });

  const availableItems = items?.filter((item) => item.status === ItemStatus.Open) ?? [];
  const filteredItems = availableItems.filter((item) => item.title.toLowerCase().includes(searchText.toLowerCase()));

  const handleClaimItem = (itemId: string): void => {
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
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Label htmlFor="search" className="sr-only">Search items</Label>
          <Input id="search" ref={searchInputRef} value={searchText} onChange={(event) => setSearchText(event.target.value)} placeholder="Search item" className="h-auto rounded-xl py-2 dark:bg-slate-900" />
          <Button type="button" onClick={() => searchInputRef.current?.focus()} className="h-auto rounded-xl bg-violet-600 py-2 text-sm text-white hover:bg-violet-700">Focus search</Button>
        </div>
        <form onSubmit={handleSubmit((values) => claimMutation.mutate(values))} className="grid gap-4 rounded-2xl border border-violet-100 bg-violet-50/60 p-4 sm:grid-cols-2 dark:border-violet-900 dark:bg-violet-950/30">
          <div className="sm:col-span-2">
            <h2 className="text-lg font-semibold">Claim an item</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Tell us how you can identify it.</p>
          </div>
          <div>
            <Label htmlFor="itemId">Item</Label>
            <select id="itemId" {...register("itemId")} className="mt-2 h-8 w-full rounded-lg border border-input bg-white px-2.5 text-sm dark:bg-slate-900">
              <option value="">Choose an item</option>
              {availableItems.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
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
        {isError && <p>Could not load items. Please sign in again and retry.</p>}
        {claimMutation.isSuccess && <p className="text-emerald-600">Claim submitted.</p>}
        {claimMutation.isError && <p role="alert" className="text-red-600">{claimMutation.error.message}</p>}
        {filteredItems?.length === 0 && <p>No matching item found.</p>}
        <div className="grid gap-4 lg:grid-cols-2">
          {filteredItems?.map((item) => (
            <ItemCard key={item.id} item={item} onClaim={handleClaimItem} />
          ))}
        </div>
      </div>
    </div>
  );
}
