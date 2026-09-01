// src/components/ClaimSummary.tsx
import type { Claim, UserSummary, ApiResponse } from "../types/app";
import { ClaimStatus } from "../types/app";

interface ClaimSummaryProps {
  claim: Claim;
  claimant: UserSummary;
  response: ApiResponse<Claim>;
}

// Shows the result of a claim request and its current status.
function ClaimSummary({ claim, claimant, response }: ClaimSummaryProps) {
  const statusColor: string =
    claim.status === ClaimStatus.Verified
      ? "green"
      : claim.status === ClaimStatus.Rejected
      ? "red"
      : "orange";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-600 dark:text-violet-400">Claim summary</p>
      <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
        <p>Claim #{claim.id}</p>
        <p>Item ID: {claim.itemId}</p>
        <p>Claimed by: {claimant.name}</p>
        <p className="font-medium" style={{ color: statusColor }}>Status: {claim.status}</p>
        {response.message && <p className="italic text-slate-500 dark:text-slate-400">{response.message}</p>}
        <p>API call success: {response.success ? "yes" : "no"}</p>
      </div>
    </div>
  );
}

export default ClaimSummary;