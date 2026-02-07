import SectionHeader from "../layout/SectionHeader.jsx";
import MealCard from "../recipes/MealCard.jsx";
import SkeletonMealCard from "../recipes/SkeletonMealCard.jsx";

export default function FeaturedMealsSection({ meals, loading, selectedId, onSelect }) {
  return (
    <section className="space-y-4">
      <SectionHeader
        title="Featured meals"
        subtitle="Editor’s picks"
        action={
          <a className="btn btn-sm btn-ghost hover:text-amber-600" href="#recipes">
            View all
          </a>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading &&
          Array.from({ length: 6 }).map((_, idx) => <SkeletonMealCard key={idx} />)}
        {!loading &&
          meals.slice(0, 6).map((meal) => (
            <MealCard
              key={meal.id}
              recipe={meal}
              active={meal.id === selectedId}
              onSelect={() => onSelect(meal.id)}
            />
          ))}
      </div>
    </section>
  );
}
