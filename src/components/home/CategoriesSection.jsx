import SectionHeader from "../layout/SectionHeader.jsx";

function CategoryCard({ label }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-base-200 bg-base-100 px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow">
      <span className="font-medium text-base-content">{label}</span>
      <span className="badge badge-sm bg-amber-100 text-amber-700">View</span>
    </div>
  );
}

export default function CategoriesSection({ categories = [] }) {
  const items = categories.slice(0, 8);
  return (
    <section className="space-y-4" id="categories">
      <SectionHeader
        title="Categories"
        subtitle="Pick a vibe"
        action={
          <a className="btn btn-sm btn-ghost hover:text-amber-600" href="/#categories">
            View all
          </a>
        }
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((cat) => (
          <CategoryCard key={cat.id} label={cat.label} />
        ))}
        {items.length === 0 && (
          <div className="col-span-full rounded-xl border border-dashed border-base-300 bg-base-100 p-6 text-center text-base-content/70">
            No categories yet. Connect data to show them.
          </div>
        )}
      </div>
    </section>
  );
}
