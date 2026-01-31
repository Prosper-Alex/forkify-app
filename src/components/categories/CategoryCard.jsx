export default function CategoryCard({ label, description = "Browse meals in this category" }) {
  return (
    <article className="flex flex-col justify-between rounded-xl border border-base-200 bg-base-100 px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow">
      <div>
        <h3 className="text-base font-semibold text-base-content">{label}</h3>
        <p className="mt-1 text-sm text-base-content/70">{description}</p>
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-amber-700">
        <span className="badge badge-sm bg-amber-100 text-amber-700">View</span>
        <span>•</span>
        <span className="underline">Open</span>
      </div>
    </article>
  );
}
