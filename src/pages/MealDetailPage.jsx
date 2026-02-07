import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useApi from "../hooks/useApi.jsx";
import MealDetailPanel from "../components/recipes/MealDetailPanel.jsx";
import useDocumentTitle from "../hooks/useDocumentTitle.jsx";
import { fetchMealById } from "../utils/mealdb.js";

export default function MealDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const mealQuery = useApi((signal) => fetchMealById(id, signal), [id]);
  const recipe = useMemo(() => mealQuery.data ?? null, [mealQuery.data]);
  useDocumentTitle(recipe?.title || "Recipe details");

  const handleBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/", { replace: true });
  };

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-4 pb-12">
      <div className="flex items-center justify-between gap-3">
        <button type="button" className="btn btn-sm btn-ghost" onClick={handleBack}>
          ← Back
        </button>
        <Link to="/" className="btn btn-sm btn-ghost">
          Home
        </Link>
      </div>

      <div className="rounded-2xl border border-base-200 bg-base-100 p-6 shadow-lg">
        {mealQuery.loading && !recipe ? (
          <div className="flex items-center justify-center gap-2 py-12 text-base-content/70">
            <span className="loading loading-dots loading-lg text-amber-500" />
            <p>Loading recipe…</p>
          </div>
        ) : !mealQuery.loading && !recipe ? (
          <div className="rounded-2xl border border-base-200 bg-base-50 p-4 text-sm text-base-content/70">
            Recipe not found.
          </div>
        ) : (
          <MealDetailPanel recipe={recipe} loading={mealQuery.loading} error={mealQuery.error} />
        )}
      </div>
    </section>
  );
}
