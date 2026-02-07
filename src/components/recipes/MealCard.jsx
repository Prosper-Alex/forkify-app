import BookmarkToggleButton from "../bookmarks/BookmarkToggleButton.jsx";
import { useBookmarks } from "../../contexts/BookmarksContext.jsx";

export default function MealCard({
  recipe,
  active,
  onSelect,
  showDetailsButton = false,
  detailsButtonLabel = "View details",
}) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(recipe.id);

  return (
    <article
      onClick={onSelect}
      className={`group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl border bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow ${
        active ? "border-amber-400 ring-2 ring-amber-200/80" : "border-base-200"
      }`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-slate-950/60 via-slate-900/25 to-transparent shadow-[0_14px_24px_rgba(15,23,42,0.35)]" />
        <div className="absolute right-2 top-2 flex gap-1">
          <BookmarkToggleButton
            size="sm"
            on={bookmarked}
            onToggle={() => toggleBookmark(recipe)}
          />
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
        <div className="mt-auto flex items-end justify-between gap-3">
          <div className="flex flex-wrap gap-2 text-xs">
            {recipe.tags.map((tag) => (
              <span
                key={tag}
                className="badge badge-outline border-base-200 bg-base-200/60 text-base-content/80"
              >
                {tag}
              </span>
            ))}
          </div>

          {showDetailsButton && (
            <button
              type="button"
              className="btn btn-xs rounded-full border-0 bg-amber-500 text-white hover:bg-amber-600 lg:hidden"
              onClick={(e) => {
                e.stopPropagation();
                onSelect?.();
              }}
            >
              {detailsButtonLabel}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

