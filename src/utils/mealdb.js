const API = "https://www.themealdb.com/api/json/v1/1";
const FALLBACK_QUERY = "chicken";

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Network error");
  return response.json();
}

export async function fetchCategories() {
  const data = await fetchJson(`${API}/list.php?c=list`);
  const categories =
    data?.meals?.map((item) => ({
      id: item.strCategory,
      label: item.strCategory,
    })) ?? [];
  return [{ id: "all", label: "All" }, ...categories];
}

export async function fetchMeals(query) {
  const searchTerm = query.trim() || FALLBACK_QUERY;
  const data = await fetchJson(`${API}/search.php?s=${encodeURIComponent(searchTerm)}`);
  return mapMeals(data?.meals ?? []);
}

export async function fetchMealById(id) {
  if (!id) return null;
  const data = await fetchJson(`${API}/lookup.php?i=${id}`);
  return mapMeals(data?.meals ?? [])[0] ?? null;
}

export function mapMeals(rawMeals) {
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
