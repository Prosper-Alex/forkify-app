import BookmarkToggleButton from "./BookmarkToggleButton.jsx";

export default function BookmarkCard({ meal, onRemove }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-base-200 bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow">
      <div className="relative h-40">
        <img
          src={meal.image}
          alt={meal.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute right-2 top-2 flex items-center gap-2">
          <BookmarkToggleButton initialOn />
          <button
            type="button"
            className="btn btn-xs btn-outline border-rose-200 bg-white text-rose-600"
            onClick={onRemove}
          >
            Remove
          </button>
        </div>
        <span className="absolute left-2 top-2 rounded-full bg-black/65 px-3 py-1 text-xs font-semibold text-white">
          {meal.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-lg font-semibold leading-tight">{meal.title}</h3>
        <p className="text-sm text-base-content/70">
          {meal.area} • {meal.category}
        </p>
        <div className="mt-auto flex flex-wrap gap-2 text-xs">
          {meal.tags.map((tag) => (
            <span
              key={tag}
              className="badge badge-outline border-base-200 bg-base-200/60 text-base-content/80"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
