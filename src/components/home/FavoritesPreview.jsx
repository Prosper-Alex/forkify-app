import SectionHeader from "../layout/SectionHeader.jsx";
import MealCard from "../recipes/MealCard.jsx";

export default function FavoritesPreview({ meals }) {
  return (
    <section className="space-y-4">
      <SectionHeader
        title="Your favorites"
        subtitle="Bookmarks preview"
        action={
          <a className="btn btn-sm btn-ghost hover:text-amber-600" href="/bookmarks">
            Open bookmarks
          </a>
        }
      />
      {meals.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-base-300 bg-base-100 p-6 text-base-content/70">
          No bookmarks yet. Save a meal to see it here.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {meals.slice(0, 3).map((meal) => (
            <MealCard key={meal.id} recipe={meal} />
          ))}
        </div>
      )}
    </section>
  );
}
