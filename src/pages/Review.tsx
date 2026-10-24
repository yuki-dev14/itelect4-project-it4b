import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { askAi } from "../api/client";
import type { AiReadiness } from "../types/app";
import { reviewRequestSchema, type ReviewRequestValues } from "../schemas/reviewSchema";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const readinessStyles: Record<AiReadiness, string> = {
  ready: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  almost: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  "not-yet": "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300",
};

export default function Review() {
  const reviewMutation = useMutation({ mutationFn: askAi });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewRequestValues>({
    resolver: zodResolver(reviewRequestSchema),
    defaultValues: { prompt: "" },
  });

  const onSubmit = (values: ReviewRequestValues): void => {
    reviewMutation.mutate(values.prompt);
  };

  return (
    <div className="min-h-screen bg-transparent px-4 py-6 text-slate-900 dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200/80 bg-white/80 p-5 shadow-lg backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600 dark:text-violet-400">
          Gemini AI
        </p>
        <h1 className="mt-2 text-3xl font-semibold">AI project review</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Describe your project to get constructive feedback before you submit.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-3">
          <Label htmlFor="project-prompt">Project description</Label>
          <textarea
            id="project-prompt"
            {...register("prompt")}
            rows={7}
            maxLength={2000}
            placeholder="Describe what your project does, who it is for, and the technologies you used..."
            aria-invalid={!!errors.prompt}
            aria-describedby={errors.prompt ? "prompt-error" : "prompt-help"}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500 dark:border-slate-700 dark:bg-slate-950"
          />
          {errors.prompt ? (
            <p id="prompt-error" role="alert" className="text-sm text-red-600">
              {errors.prompt.message}
            </p>
          ) : (
            <p id="prompt-help" className="text-sm text-slate-500 dark:text-slate-400">
              Enter 20 to 2000 characters. Do not include passwords or private information.
            </p>
          )}
          <Button
            type="submit"
            disabled={reviewMutation.isPending}
            className="w-fit bg-violet-600 text-white hover:bg-violet-700"
          >
            {reviewMutation.isPending ? "Reviewing..." : "Review project"}
          </Button>
        </form>

        {reviewMutation.isError && (
          <p role="alert" className="mt-4 text-sm text-red-600">
            {reviewMutation.error.message}
          </p>
        )}

        {reviewMutation.data && (
          <section aria-live="polite" className="mt-6 grid gap-5 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-950">
            <span className={`justify-self-start rounded px-2 py-1 text-sm font-semibold ${readinessStyles[reviewMutation.data.readiness]}`}>
              {reviewMutation.data.readiness}
            </span>
            <p>{reviewMutation.data.summary}</p>
            <div>
              <h2 className="font-semibold">Strengths</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
                {reviewMutation.data.strengths.map((strength, index) => (
                  <li key={`${index}-${strength}`}>{strength}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-semibold">Before you submit</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
                {reviewMutation.data.improvements.map((improvement, index) => (
                  <li key={`${index}-${improvement}`}>{improvement}</li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
