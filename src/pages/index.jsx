import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

const API = "https://www.themealdb.com/api/json/v1/1";
const FALLBACK_QUERY = "chicken";

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Network error");
  return response.json();
}

async function fetchCategories() {
  const data = await fetchJson(`${API}/list.php?c=list`);
  const categories =
    data?.meals?.map((item) => ({
      id: item.strCategory,
      label: item.strCategory,
    })) ?? [];
  return [{ id: "all", label: "All" }, ...categories];
}

async function fetchMeals(query) {
  const searchTerm = query.trim() || FALLBACK_QUERY;
  const data = await fetchJson(`${API}/search.php?s=${encodeURIComponent(searchTerm)}`);
  return mapMeals(data?.meals ?? []);
}

async function fetchMealById(id) {
  if (!id) return null;
  const data = await fetchJson(`${API}/lookup.php?i=${id}`);
  return mapMeals(data?.meals ?? [])[0] ?? null;
}

function mapMeals(rawMeals) {
  return rawMeals.map((meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i += 1) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        const label =
          measure && measure.trim() ? `${measure.trim()} ${ingredient.trim()}` : ingredient.trim();
        ingredients.push(label);
      }
    }

    const steps =
      meal.strInstructions
        ?.split("\n")
        .map((line) => line.trim())
        .filter(Boolean) ?? [];

    const tags = [
      meal.strCategory?.toLowerCase(),
      meal.strArea?.toLowerCase(),
      ...(meal.strTags ? meal.strTags.split(",").map((t) => t.trim().toLowerCase()) : []),
    ].filter(Boolean);

    return {
      id: meal.idMeal,
      title: meal.strMeal,
      description: meal.strArea ? `${meal.strArea} • ${meal.strCategory}` : meal.strCategory || "Recipe",
      image: meal.strMealThumb,
      time: 30,
      servings: 2,
      difficulty: tags.includes("easy") ? "Easy" : "Home Cook",
      tags,
      ingredients,
      steps: steps.length ? steps : ["Follow the instructions in TheMealDB response."],
      nutrition: { calories: "—", protein: "—", carbs: "—", fat: "—" },
    };
  });
}

export default function IndexPage() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("all");
  const [selectedId, setSelectedId] = useState("");

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const mealsQuery = useQuery({
    queryKey: ["meals", query],
    queryFn: () => fetchMeals(query),
  });

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

  return (
    <section className="flex flex-col gap-8 pb-16">
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
              Search across chef-tested dishes, skim the cards, then open a complete recipe with
              timing, servings, ingredients, steps, and nutrition at a glance.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-slate-700">
              <span className="badge badge-outline border-amber-300 bg-white text-amber-700">
                No scrolling safari — full details on the right
              </span>
              <span className="badge badge-outline border-rose-200 bg-white text-rose-700">
                20–35 minute dinners
              </span>
            </div>
          </div>
          <div className="relative">
            <div className="glass rounded-2xl bg-white/60 p-5 shadow">
              <dl className="grid grid-cols-2 gap-4 text-sm text-slate-700">
                <div>
                  <dt className="text-xs uppercase text-slate-500">Recipes</dt>
                  <dd className="text-2xl font-semibold text-slate-900">
                    {mealsQuery.data?.length ?? "—"} live
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase text-slate-500">Average time</dt>
                  <dd className="text-2xl font-semibold text-slate-900">~30 min</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase text-slate-500">Diet-friendly</dt>
                  <dd className="text-2xl font-semibold text-slate-900">Global picks</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase text-slate-500">Built for</dt>
                  <dd className="text-2xl font-semibold text-slate-900">Weeknights</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-base-200 bg-base-100 p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-3 rounded-xl bg-base-200 px-4 py-2 focus-within:ring-2 focus-within:ring-amber-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-5 w-5 text-base-content/60"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.5 15.5 19 19m-3.5-3.5A5.5 5.5 0 1 0 5 10.5a5.5 5.5 0 0 0 10.5 0Z"
              />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by recipe, ingredient, or vibe…"
              className="input input-ghost w-full bg-transparent focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="btn btn-xs btn-ghost text-base-content/70"
              >
                Clear
              </button>
            )}
          </div>
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
            filteredMeals.map((recipe) => {
              const isActive = selectedRecipe && recipe.id === selectedRecipe.id;
              return (
                <article
                  key={recipe.id}
                  onClick={() => setSelectedId(recipe.id)}
                  className={`group flex cursor-pointer flex-col overflow-hidden rounded-2xl border bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow ${
                    isActive ? "border-amber-400 ring-2 ring-amber-200/80" : "border-base-200"
                  }`}
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-black/65 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                      {recipe.time} min • {recipe.difficulty}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <header className="space-y-1">
                      <h3 className="text-lg font-semibold leading-tight text-base-content">
                        {recipe.title}
                      </h3>
                      <p className="text-sm text-base-content/70 line-clamp-2">
                        {recipe.description}
                      </p>
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
            })}
          {!mealsQuery.isLoading && filteredMeals.length === 0 && (
            <div className="col-span-2 flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-base-300 bg-base-100 p-10 text-center text-base-content/70">
              <p className="text-lg font-semibold text-base-content">No recipes found</p>
              <p>Try a different ingredient or clear your filters.</p>
            </div>
          )}
        </div>

        <aside className="flex flex-col gap-4 rounded-2xl border border-base-200 bg-base-100 p-6 shadow-lg">
          {!selectedRecipe ? (
            <div className="flex items-center justify-center gap-2 py-12 text-base-content/70">
              <span className="loading loading-dots loading-lg text-amber-500" />
              <p>Choose a recipe to view details.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-base-content/60">
                    Complete recipe
                  </p>
                  <h2 className="text-2xl font-semibold text-base-content">{selectedRecipe.title}</h2>
                  <p className="text-sm text-base-content/70">{selectedRecipe.description}</p>
                </div>
                <span className="badge badge-lg bg-amber-100 text-amber-700">
                  {selectedRecipe.time} min
                </span>
              </div>

              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={selectedRecipe.image}
                  alt={selectedRecipe.title}
                  className="h-52 w-full rounded-xl object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 flex gap-2 text-xs text-white">
                  <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur">
                    {selectedRecipe.servings} servings
                  </span>
                  <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur">
                    {selectedRecipe.difficulty}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <Stat label="Calories" value={`${selectedRecipe.nutrition.calories}`} />
                <Stat label="Protein" value={`${selectedRecipe.nutrition.protein}`} />
                <Stat label="Carbs" value={`${selectedRecipe.nutrition.carbs}`} />
                <Stat label="Fat" value={`${selectedRecipe.nutrition.fat}`} />
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-base-content/80">
                  Ingredients
                </h3>
                <ul className="grid grid-cols-1 gap-2 text-sm text-base-content/80">
                  {selectedRecipe.ingredients.map((item, index) => (
                    <li
                      key={`${item}-${index}`}
                      className="flex items-start gap-2 rounded-lg bg-base-200/60 px-3 py-2"
                    >
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
                  {selectedRecipe.steps.map((step, index) => (
                    <li
                      key={`${step}-${index}`}
                      className="rounded-lg border border-base-200 bg-base-50 px-3 py-2 leading-relaxed"
                    >
                      <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-xs font-semibold text-amber-700">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </>
          )}
        </aside>
      </div>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-base-200 bg-base-50 px-3 py-2">
      <p className="text-xs uppercase tracking-wide text-base-content/60">{label}</p>
      <p className="text-lg font-semibold text-base-content">{value}</p>
    </div>
  );
}
