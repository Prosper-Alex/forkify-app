import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import HeroSection from "../components/home/HeroSection.jsx";
import FeaturedMealsSection from "../components/home/FeaturedMealsSection.jsx";
import CategoriesSection from "../components/home/CategoriesSection.jsx";
import ChipsRow from "../components/home/ChipsRow.jsx";
import FavoritesPreview from "../components/home/FavoritesPreview.jsx";
import CtaStrip from "../components/home/CtaStrip.jsx";
import MealDetailPanel from "../components/recipes/MealDetailPanel.jsx";
import SectionHeader from "../components/layout/SectionHeader.jsx";
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
    if (!selectedId) return;
    if (!filteredMeals.some((meal) => meal.id === selectedId)) {
      setSelectedId("");
    }
  }, [filteredMeals, selectedId]);

  const detailQuery = useQuery({
    queryKey: ["meal", selectedId],
    queryFn: () => fetchMealById(selectedId),
    enabled: Boolean(selectedId),
  });

  const selectedRecipe = detailQuery.data || filteredMeals.find((m) => m.id === selectedId);
  const tags = categoriesQuery.data ?? [{ id: "all", label: "All" }];

  const addHistory = (term) => {
    if (!term.trim()) return;
    setHistory((prev) => {
      const next = [term.trim(), ...prev.filter((t) => t !== term.trim())];
      return next.slice(0, 8);
    });
  };

  return (
    <section className="flex flex-col gap-10 pb-16">
      <HeroSection
        query={query}
        setQuery={setQuery}
        addHistory={addHistory}
        history={history}
        onClearHistory={() => setHistory([])}
        onRemoveHistory={(term) => setHistory((prev) => prev.filter((t) => t !== term))}
      />

      <div className="flex flex-wrap gap-2" id="recipes">
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

      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-8">
          <FeaturedMealsSection
            meals={filteredMeals}
            loading={mealsQuery.isLoading}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
          <CategoriesSection categories={tags.filter((t) => t.id !== "all")} />
          <section className="space-y-3" id="areas">
            <SectionHeader
              title="Cuisines"
              subtitle="Explore by area"
              action={
                <a className="btn btn-xs btn-ghost hover:text-amber-600" href="/cuisines">
                  Explore cuisines
                </a>
              }
            />
            <ChipsRow items={areasSample} label="cuisines" />
          </section>
          <section className="space-y-3" id="ingredients">
            <SectionHeader
              title="Ingredients"
              subtitle="Pantry picks"
              action={
                <a className="btn btn-xs btn-ghost hover:text-amber-600" href="/ingredients">
                  See all ingredients
                </a>
              }
            />
            <ChipsRow items={ingredientsSample} label="ingredients" />
          </section>
          <FavoritesPreview meals={[]} />
          <CtaStrip />
        </div>

        <aside className="flex flex-col gap-4 rounded-2xl border border-base-200 bg-base-100 p-6 shadow-lg">
          {selectedRecipe ? (
            <MealDetailPanel recipe={selectedRecipe} />
          ) : (
            <div className="flex flex-col items-start gap-3 rounded-xl border border-dashed border-base-300 bg-base-50 p-4">
              <p className="text-sm font-semibold text-base-content">Recipe details</p>
              <p className="text-sm text-base-content/70">
                Select a meal card to open the full details. This panel stays collapsed until you pick one.
              </p>
              <div className="rounded-lg bg-base-200 px-3 py-2 text-xs text-base-content/60">
                Tip: use filters or search, then tap a card.
              </div>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
