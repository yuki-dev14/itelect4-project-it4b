import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getClaims, getItems } from "../api/client";
import type { Claim } from "../types/app";

type ClaimRecord = Claim & {
  claimantEmail?: string;
  claimDetails?: string;
};

export default function Claims() {
  // Fetch item data so each claim can display the actual item title.
  const { data: items, isLoading: isItemsLoading } = useQuery({
    queryKey: ["items"],
    queryFn: getItems,
  });

  // Fetch the claim records from the API.
  const { data: claims, isLoading: isClaimsLoading, isError } = useQuery({
    queryKey: ["claims"],
    queryFn: getClaims,
  });

  const claimRows = (claims ?? []) as ClaimRecord[];

  if (isItemsLoading || isClaimsLoading) return <div className="p-6">Loading claims...</div>;
  if (isError) return <div className="p-6">Could not load claims.</div>;

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold">Claims</h2>
        <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-700 dark:bg-violet-950 dark:text-violet-300">
          {claimRows.length} total
        </span>
      </div>

      {claimRows.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          No claimed items yet.
        </div>
      ) : (
        <div className="space-y-4">
          {claimRows.map((claim) => {
            const item = items?.find((entry) => entry.id === claim.itemId);
            return (
              <div key={claim.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-600 dark:text-violet-400">Claim</p>
                    <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100">
                      {item ? item.title : `Item #${claim.itemId}`}
                    </h3>
                  </div>
                </div>

                <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  {claim.claimantEmail && <p>Email: {claim.claimantEmail}</p>}
                  {claim.claimDetails && <p>Details: {claim.claimDetails}</p>}
                  {item && <p>Reported: {item.dateReported.toLocaleDateString()}</p>}
                </div>

                {item && (
                  <div className="mt-4">
                    <Link to={`/items/${item.id}`} className="text-sm font-medium text-violet-600 hover:underline dark:text-violet-400">
                      View item
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
