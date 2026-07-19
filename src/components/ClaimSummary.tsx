// src/components/ClaimSummary.tsx
import type { Claim, UserSummary, ApiResponse } from "../types/app";
import { ClaimStatus } from "../types/app";

interface ClaimSummaryProps {
  claim: Claim;
  claimant: UserSummary;
  response: ApiResponse<Claim>;
}

function ClaimSummary({ claim, claimant, response }: ClaimSummaryProps) {
  const statusColor: string =
    claim.status === ClaimStatus.Verified
      ? "green"
      : claim.status === ClaimStatus.Rejected
      ? "red"
      : "orange";

  return (
    <div style={{ border: "1px solid #ccc", padding: "0.75rem", borderRadius: "8px" }}>
      <p>Claim #{claim.id}</p>
      <p>Item ID: {claim.itemId}</p>
      <p>Claimed by: {claimant.name}</p>
      <p style={{ color: statusColor }}>Status: {claim.status}</p>
      {response.message && <p><em>{response.message}</em></p>}
      <p>API call success: {response.success ? "yes" : "no"}</p>
    </div>
  );
}

export default ClaimSummary;