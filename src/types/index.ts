export * from "./app";

// ===== SESSION 11: what POST /api/ai sends back =======================
export interface AiReview {
  summary: string;
  strengths: string[];
  improvements: string[];
  readiness: "ready" | "almost" | "not-yet";
}

// ===== SESSION 12: submission type used across components and tests ===
export interface ApiSubmission {
  id: string;
  studentId: string;
  courseCode: string;
  repoUrl: string;
  submittedAt: string;
  score?: number;
}
