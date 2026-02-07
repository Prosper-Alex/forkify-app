import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi.jsx";
import useMediaQuery from "../hooks/useMediaQuery.jsx";
import SearchBar from "../components/search-history/SearchBar.jsx";
import RecentChips from "../components/search-history/RecentChips.jsx";
import MealCard from "../components/recipes/MealCard.jsx";
import MealDetailPanel from "../components/recipes/MealDetailPanel.jsx";
import SectionHeader from "../components/layout/SectionHeader.jsx";
import useDocumentTitle from "../hooks/useDocumentTitle.jsx";
import { fetchCategories, fetchMealById, fetchMeals } from "../utils/mealdb.js";

const areasSample = ["Italian", "Mexican", "Japanese", "Indian", "French", "Greek"];
const ingredientsSample = [
  "Chicken",
  "Beef",
  "Tomato",
  "Onion",
  "Garlic",
  "Basil",
  "Rice",
  "Pasta",
];

export default function IndexPage() {
  const navigate = useNavigate();
  const desktopLayout = useMediaQuery("(min-width: 1024px)");
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("all");
  const [selectedId, setSelectedId] = useState("");
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const detailScrollRef = useRef(null);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const homeTitle = query.trim()
    ? `Search: ${query.trim()}`
    : activeTag !== "all"
      ? `Category: ${activeTag}`
      : "Home";
  useDocumentTitle(homeTitle);

  const categoriesQuery = useApi((signal) => fetchCategories(signal), []);
  const mealsQuery = useApi(
    (signal) => fetchMeals(query, signal, activeTag),
    [query, activeTag],
  );

  const handleCategoryClick = (e) => {
    const cat = e.currentTarget.dataset.category;
    if (!cat) return;
    setActiveTag(cat);
  };

  const filteredMeals = useMemo(() => {
    const allMeals = mealsQuery.data ?? [];
    if (activeTag === "all") return allMeals;
    const normalized = activeTag.toLowerCase();
    return allMeals.filter((meal) => meal.tags.includes(normalized));
  }, [mealsQuery.data, activeTag]);

  useEffect(() => {
    if (!selectedId) return;
    if (!filteredMeals.some((meal) => meal.id === selectedId)) {
      setSelectedId("");
    }
  }, [filteredMeals, selectedId]);

  const detailQuery = useApi(
    (signal) => fetchMealById(selectedId, signal),
    [selectedId],
  );

  const selectedRecipe =
    detailQuery.data || filteredMeals.find((m) => m.id === selectedId);
  const tags = categoriesQuery.data ?? [{ id: "all", label: "All" }];
  const pageSize = 8;
  const totalPages = Math.max(1, Math.ceil(filteredMeals.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredMeals.length);
  const pagedMeals = filteredMeals.slice(startIndex, endIndex);
  const pageButtons = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pages = [1];
    const left = Math.max(2, currentPage - 1);
    const right = Math.min(totalPages - 1, currentPage + 1);

    if (left > 2) pages.push("...");
    for (let page = left; page <= right; page += 1) pages.push(page);
    if (right < totalPages - 1) pages.push("...");
    pages.push(totalPages);

    return pages;
  }, [currentPage, totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, activeTag]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  useEffect(() => {
    const scroller = detailScrollRef.current;
    if (!scroller) return undefined;

    const updateScrollState = () => {
      const canScrollMore =
        scroller.scrollTop + scroller.clientHeight < scroller.scrollHeight - 6;
      setShowScrollDown(canScrollMore);
    };

    updateScrollState();
    scroller.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      scroller.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [selectedId, selectedRecipe]);

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
        className="scroll-mt-28 flex flex-col gap-4 rounded-2xl border border-base-200 bg-base-100 p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <SearchBar
            value={query}
            onChange={setQuery}
            onSubmit={addHistory}
            history={history}
            onSelectHistory={(term) => setQuery(term)}
            onRemoveHistory={(term) =>
              setHistory((prev) => prev.filter((t) => t !== term))
            }
            onClearHistory={() => setHistory([])}
          />
          <div className="flex items-center gap-2 text-sm text-base-content/70">
            <span className="badge badge-sm min-w-[7.5rem] justify-center bg-amber-100 px-2 font-semibold tabular-nums text-amber-700">
              {mealsQuery.loading ? "..." : filteredMeals.length} matches
            </span>
            <span className="hidden text-xs md:inline">|</span>
            <span className="hidden md:inline">
              Tap a card to open full recipe {"->"}
            </span>
          </div>
        </div>

        {mealsQuery.error && (
          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            Error loading meals: {mealsQuery.error.message}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {categoriesQuery.error ? (
            <div className="text-sm text-red-600">Error loading categories</div>
          ) : (
            tags.map((tag) => {
              const isActive = activeTag === tag.id;
              return (
                <button
                  key={tag.id}
                  type="button"
                  data-category={tag.id}
                  onClick={handleCategoryClick}
                  className={`btn btn-sm rounded-full ${
                    isActive
                      ? "btn-primary border-0 bg-amber-500 text-white"
                      : "btn-ghost border border-base-300 bg-base-100 text-base-content hover:bg-base-200/60"
                  }`}>
                  {" "}
                  {tag.label}
                </button>
              );
            })
          )}
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div className="flex min-w-0 flex-wrap gap-4">
            {mealsQuery.loading && (
              <div className="w-full flex items-center justify-center rounded-2xl border border-base-200 bg-base-100 p-10">
                <span className="loading loading-dots loading-lg text-amber-500" />
              </div>
            )}

            {!mealsQuery.loading &&
              pagedMeals.map((recipe) => (
                <div
                  key={recipe.id}
                  className={`flex basis-full sm:basis-[48%] ${
                    selectedId ? "lg:basis-[31%]" : "lg:basis-[23%]"
                  }`}>
                  <MealCard
                    recipe={recipe}
                    active={selectedId && recipe.id === selectedId}
                    showDetailsButton={!desktopLayout}
                    onSelect={() => {
                      if (desktopLayout) {
                        setSelectedId((prev) => (prev === recipe.id ? "" : recipe.id));
                      } else navigate(`/meal/${recipe.id}`);
                    }}
                  />
                </div>
              ))}

            {!mealsQuery.loading && filteredMeals.length === 0 && (
              <div className="w-full flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-base-300 bg-base-100 p-10 text-center text-base-content/70">
                <p className="text-lg font-semibold text-base-content">
                  No recipes found
                </p>
                <p>Try a different ingredient or clear your filters.</p>
              </div>
            )}
          </div>

          {!mealsQuery.loading && filteredMeals.length > 0 && (
            <div className="rounded-2xl border border-base-200 bg-base-100 px-4 py-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-base-content/70">
                  Showing <span className="font-semibold">{startIndex + 1}</span>-
                  <span className="font-semibold">{endIndex}</span> of{" "}
                  <span className="font-semibold">{filteredMeals.length}</span>{" "}
                  recipes
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-ghost border border-base-300 disabled:opacity-40"
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}>
                    First
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-ghost border border-base-300 disabled:opacity-40"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}>
                    Prev
                  </button>
                  <div className="flex items-center gap-1">
                    {pageButtons.map((page, index) =>
                      page === "..." ? (
                        <span
                          key={`ellipsis-${index}`}
                          className="px-2 text-base-content/60">
                          ...
                        </span>
                      ) : (
                        <button
                          key={page}
                          type="button"
                          onClick={() => setCurrentPage(page)}
                          className={`btn btn-sm min-w-9 ${
                            page === currentPage
                              ? "border-0 bg-amber-500 text-white"
                              : "btn-ghost border border-base-300"
                          }`}>
                          {page}
                        </button>
                      ),
                    )}
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm btn-ghost border border-base-300 disabled:opacity-40"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}>
                    Next
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-ghost border border-base-300 disabled:opacity-40"
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}>
                    Last
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <aside
          className={`hidden overflow-hidden transition-all duration-500 ease-out lg:sticky lg:top-24 lg:flex lg:h-[calc(100vh-7rem)] lg:self-start ${
            selectedId
              ? "lg:flex-[0_1_33%] opacity-100"
              : "lg:flex-[0_1_0%] opacity-0 pointer-events-none"
          }`}>
          <div
            className={`relative min-h-0 h-full rounded-2xl border border-base-200 bg-base-100 p-6 shadow-lg transition-transform duration-500 ease-out ${
              selectedId ? "translate-x-0" : "translate-x-10"
            }`}>
            <div
              ref={detailScrollRef}
              className="detail-panel-scroll min-h-0 h-full overflow-y-auto overscroll-contain pb-2 pr-2">
              <MealDetailPanel
                recipe={selectedRecipe}
                loading={detailQuery.loading}
                error={detailQuery.error}
                onClose={() => setSelectedId("")}
              />
            </div>
            {showScrollDown && (
              <button
                type="button"
                aria-label="Scroll down"
                title="Scroll down"
                className="absolute bottom-4 right-4 btn btn-circle btn-sm border-0 bg-amber-500 text-white shadow-lg shadow-amber-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-600"
                onClick={() => {
                  detailScrollRef.current?.scrollBy({ top: 220, behavior: "smooth" });
                }}>
                ↓
              </button>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}

function Hero({ history, onSelectChip }) {
  return (
    <div className="relative overflow-hidden rounded-3xl  bg-linear-to-r from-amber-100 via-orange-50 to-rose-100 px-8 py-10 shadow-lg ring-1 ring-orange-200/60">
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
            Search across chef-tested dishes, skim the cards, then open a
            complete recipe with timing, servings, ingredients, steps, and
            nutrition at a glance.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-slate-700">
            <span className="badge badge-outline border-amber-300 bg-white text-amber-700">
              No scrolling safari - full details on the right
            </span>
            <span className="badge badge-outline border-rose-200 bg-white text-rose-700">
              20-35 minute dinners
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

