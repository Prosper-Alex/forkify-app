import BookmarkToggleButton from "../bookmarks/BookmarkToggleButton.jsx";

export default function MealCard({ recipe, active, onSelect }) {
  return (
    <article
      onClick={onSelect}
      className={`group flex cursor-pointer flex-col overflow-hidden rounded-2xl border bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow ${
        active ? "border-amber-400 ring-2 ring-amber-200/80" : "border-base-200"
      }`}
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute right-2 top-2 flex gap-1">
          <BookmarkToggleButton size="sm" />
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-black/65 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {recipe.time} min • {recipe.difficulty}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <header className="space-y-1">
          <h3 className="text-lg font-semibold leading-tight text-base-content">{recipe.title}</h3>
          <p className="text-sm text-base-content/70 line-clamp-2">{recipe.description}</p>
        </header>
        <div className="mt-auto flex flex-wrap gap-2 text-xs">
          {recipe.tags.map((tag) => (
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
