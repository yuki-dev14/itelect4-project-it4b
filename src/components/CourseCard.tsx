interface CourseCardProps {
  course: {
    code: string;
    title: string;
    units: number;
    semester: string;
    status: string;
  };
  variant?: "default" | "compact";
}

function CourseCard({ course, variant = "default" }: CourseCardProps) {
  const isCompact = variant === "compact";

  return (
    <section className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900 ${isCompact ? "space-y-2" : "space-y-3"}`}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-600 dark:text-violet-400">Course</p>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{course.title}</h3>
        </div>
        <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700 dark:bg-violet-950 dark:text-violet-300">
          {course.code}
        </span>
      </div>

      {!isCompact && (
        <div className="text-sm text-slate-600 dark:text-slate-300">
          <p>{course.units} units • {course.semester}</p>
          <p className="mt-1 font-medium text-emerald-600 dark:text-emerald-400">{course.status}</p>
        </div>
      )}
    </section>
  );
}

export default CourseCard;
