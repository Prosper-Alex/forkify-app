import { useEffect, useState } from "react";
import BookmarkToggleButton from "../bookmarks/BookmarkToggleButton.jsx";
import AddToShoppingButton from "../shopping-list/AddToShoppingButton.jsx";
import { useBookmarks } from "../../contexts/BookmarksContext.jsx";
import { useShoppingList } from "../../contexts/ShoppingListContext.jsx";

export default function MealDetailPanel({ recipe, loading = false, error = null }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { addIngredientsFromRecipe } = useShoppingList();
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    if (!notice) return undefined;
    const t = setTimeout(() => setNotice(null), 2400);
    return () => clearTimeout(t);
  }, [notice]);

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        Error loading recipe: {error.message}
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex items-center justify-center gap-2 py-12 text-base-content/70">
        <span className="loading loading-dots loading-lg text-amber-500" />
        <p>Choose a recipe to view details.</p>
      </div>
    );
  }

  const bookmarked = isBookmarked(recipe.id);
  const ingredientsCount = recipe.ingredients?.length ?? 0;
  const canAddIngredients = ingredientsCount > 0;

  const handleAddIngredients = () => {
    if (!canAddIngredients) {
      setNotice({ type: "info", text: "Open a recipe with ingredients to add it." });
      return;
    }
    addIngredientsFromRecipe(recipe);
    setNotice({
      type: "success",
      text: `Added ${ingredientsCount} ingredient${ingredientsCount === 1 ? "" : "s"} to your list.`,
    });
  };

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-base-content/60">
            Complete recipe
          </p>
          <h2 className="text-2xl font-semibold text-base-content">
            {recipe.title}
          </h2>
          <p className="text-sm text-base-content/70">{recipe.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <BookmarkToggleButton on={bookmarked} onToggle={() => toggleBookmark(recipe)} />
          <span className="badge badge-lg bg-amber-100 text-amber-700">
            {recipe.time} min
          </span>
        </div>
      </div>

      {loading && (
        <div className="flex items-center gap-2 rounded-xl border border-base-200 bg-base-50 px-3 py-2 text-sm text-base-content/70">
          <span className="loading loading-spinner loading-sm text-amber-500" />
          Loading full details…
        </div>
      )}

      {notice && (
        <div
          role="status"
          className={`rounded-xl border px-3 py-2 text-sm ${
            notice.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-base-200 bg-base-50 text-base-content/70"
          }`}
        >
          {notice.text}
        </div>
      )}

      <div className="relative overflow-hidden rounded-xl">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-52 w-full rounded-xl object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-3 left-3 flex gap-2 text-xs text-white">
          <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur">
            {recipe.servings} servings
          </span>
          <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur">
            {recipe.difficulty}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <Stat label="Calories" value={`${recipe.nutrition.calories}`} />
        <Stat label="Protein" value={`${recipe.nutrition.protein}`} />
        <Stat label="Carbs" value={`${recipe.nutrition.carbs}`} />
        <Stat label="Fat" value={`${recipe.nutrition.fat}`} />
      </div>

      <div className="space-y-2">
        <AddToShoppingButton onClick={handleAddIngredients} disabled={!canAddIngredients} />
        {!canAddIngredients && (
          <p className="text-xs text-base-content/50">
            Some category results are previews — open a recipe to load ingredients.
          </p>
        )}
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-base-content/80">
          Ingredients
        </h3>
        <ul className="grid grid-cols-1 gap-2 text-sm text-base-content/80">
          {recipe.ingredients.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="flex items-start gap-2 rounded-lg bg-base-200/60 px-3 py-2">
              <span className="mt-0.5 h-2 w-2 rounded-full bg-amber-500" />
              <span className="flex-1">{item}</span>
              <span className="text-xs text-base-content/50">#{index + 1}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-base-content/80">
          Steps
        </h3>
        <ol className="space-y-2 text-sm text-base-content/80">
          {recipe.steps.map((step, index) => (
            <li
              key={`${step}-${index}`}
              className="rounded-lg border border-base-200 bg-base-50 px-3 py-2 leading-relaxed">
              <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-xs font-semibold text-amber-700">
                {index + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-base-200 bg-base-50 px-3 py-2">
      <p className="text-xs uppercase tracking-wide text-base-content/60">
        {label}
      </p>
      <p className="text-lg font-semibold text-base-content">{value}</p>
    </div>
  );
}
