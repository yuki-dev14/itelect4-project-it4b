export * from "./app";

// ===== SESSION 11: what POST /api/ai sends back =======================
export interface AiReview {
  summary: string;
  strengths: string[];
  improvements: string[];
  readiness: "ready" | "almost" | "not-yet";
}
