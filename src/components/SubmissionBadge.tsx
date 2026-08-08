interface SubmissionBadgeProps {
  label: string;
  tone?: "default" | "success" | "warning";
}

function SubmissionBadge({ label, tone = "default" }: SubmissionBadgeProps) {
  const toneClasses = {
    default: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
    success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    warning: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  };

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${toneClasses[tone]}`}>
      {label}
    </span>
  );
}

export default SubmissionBadge;
