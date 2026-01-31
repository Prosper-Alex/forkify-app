import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "../components/search-history/SearchBar.jsx";
import RecentChips from "../components/search-history/RecentChips.jsx";
import MealCard from "../components/recipes/MealCard.jsx";
import MealDetailPanel from "../components/recipes/MealDetailPanel.jsx";
import { fetchCategories, fetchMealById, fetchMeals } from "../utils/mealdb.js";

export default function IndexPage() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("all");
  const [selectedId, setSelectedId] = useState("");
  const [history, setHistory] = useState([]);

  const categoriesQuery = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });
  const mealsQuery = useQuery({ queryKey: ["meals", query], queryFn: () => fetchMeals(query) });

  const filteredMeals = useMemo(() => {
    const allMeals = mealsQuery.data ?? [];
    if (activeTag === "all") return allMeals;
    const normalized = activeTag.toLowerCase();
    return allMeals.filter((meal) => meal.tags.includes(normalized));
  }, [mealsQuery.data, activeTag]);

  useEffect(() => {
    if (filteredMeals.length === 0) return;
    if (!selectedId || !filteredMeals.some((meal) => meal.id === selectedId)) {
      setSelectedId(filteredMeals[0].id);
    }
  }, [filteredMeals, selectedId]);

  const detailQuery = useQuery({
    queryKey: ["meal", selectedId],
    queryFn: () => fetchMealById(selectedId),
    enabled: Boolean(selectedId),
  });

  const selectedRecipe =
    detailQuery.data || filteredMeals.find((m) => m.id === selectedId) || filteredMeals[0];
  const tags = categoriesQuery.data ?? [{ id: "all", label: "All" }];

  const addHistory = (term) => {
    if (!term.trim()) return;
    setHistory((prev) => {
      const next = [term.trim(), ...prev.filter((t) => t !== term.trim())];
      return next.slice(0, 8);
    });
  };

  return (
    <section className="flex flex-col gap-8 pb-16">
      <Hero history={history} onSelectChip={(term) => setQuery(term)} />

      <div
        id="recipes"
        className="scroll-mt-28 flex flex-col gap-4 rounded-2xl border border-base-200 bg-base-100 p-6 shadow-sm"
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <SearchBar
            value={query}
            onChange={setQuery}
            onSubmit={addHistory}
            history={history}
            onSelectHistory={(term) => setQuery(term)}
            onRemoveHistory={(term) => setHistory((prev) => prev.filter((t) => t !== term))}
            onClearHistory={() => setHistory([])}
          />
          <div className="flex items-center gap-2 text-sm text-base-content/70">
            <span className="badge badge-sm bg-amber-100 text-amber-700">
              {mealsQuery.isLoading ? "…" : filteredMeals.length} matches
            </span>
            <span className="hidden md:inline text-xs">•</span>
            <span className="hidden md:inline">Tap a card to open full recipe →</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const isActive = activeTag === tag.id;
            return (
              <button
                key={tag.id}
                type="button"
                onClick={() => setActiveTag(tag.id)}
                className={`btn btn-sm rounded-full ${
                  isActive
                    ? "btn-primary border-0 bg-amber-500 text-white"
                    : "btn-ghost border border-base-300 bg-white text-base-content"
                }`}
              >
                {tag.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {mealsQuery.isLoading && (
            <div className="col-span-2 flex items-center justify-center rounded-2xl border border-base-200 bg-base-100 p-10">
              <span className="loading loading-dots loading-lg text-amber-500" />
            </div>
          )}

          {!mealsQuery.isLoading &&
            filteredMeals.map((recipe) => (
              <MealCard
                key={recipe.id}
                recipe={recipe}
                active={selectedRecipe && recipe.id === selectedRecipe.id}
                onSelect={() => setSelectedId(recipe.id)}
              />
            ))}

          {!mealsQuery.isLoading && filteredMeals.length === 0 && (
            <div className="col-span-2 flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-base-300 bg-base-100 p-10 text-center text-base-content/70">
              <p className="text-lg font-semibold text-base-content">No recipes found</p>
              <p>Try a different ingredient or clear your filters.</p>
            </div>
          )}
        </div>

        <aside className="flex flex-col gap-4 rounded-2xl border border-base-200 bg-base-100 p-6 shadow-lg">
          <MealDetailPanel recipe={selectedRecipe} />
        </aside>
      </div>
    </section>
  );
}

function Hero({ history, onSelectChip }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-100 via-orange-50 to-rose-100 px-8 py-10 shadow-lg ring-1 ring-orange-200/60">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.9),transparent_45%)]" />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
            Forkify Kitchen
          </p>
          <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
            Find a recipe, cook it fully, and enjoy the win.
          </h1>
          <p className="text-base text-slate-700 md:text-lg">
            Search across chef-tested dishes, skim the cards, then open a complete recipe with timing,
            servings, ingredients, steps, and nutrition at a glance.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-slate-700">
            <span className="badge badge-outline border-amber-300 bg-white text-amber-700">
              No scrolling safari — full details on the right
            </span>
            <span className="badge badge-outline border-rose-200 bg-white text-rose-700">
              20–35 minute dinners
            </span>
          </div>
          <div className="pt-2">
            <RecentChips items={history} onSelect={onSelectChip} />
          </div>
        </div>
        <div className="relative">
          <div className="glass rounded-2xl bg-white/60 p-5 shadow">
            <dl className="grid grid-cols-2 gap-4 text-sm text-slate-700">
              <Stat label="Recipes" value="Live" />
              <Stat label="Average time" value="~30 min" />
              <Stat label="Diet-friendly" value="Global picks" />
              <Stat label="Built for" value="Weeknights" />
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <dt className="text-xs uppercase text-slate-500">{label}</dt>
      <dd className="text-2xl font-semibold text-slate-900">{value}</dd>
    </div>
  );
}
