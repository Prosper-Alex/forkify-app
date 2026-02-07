import SectionHeader from "../components/layout/SectionHeader.jsx";
import CategoryCard from "../components/categories/CategoryCard.jsx";

const sampleCategories = [
  "Beef",
  "Chicken",
  "Dessert",
  "Lamb",
  "Miscellaneous",
  "Pasta",
  "Pork",
  "Seafood",
  "Side",
  "Starter",
  "Vegan",
  "Vegetarian",
];

export default function CategoriesPage() {
  return (
    <section className="flex flex-col gap-6 pb-12">
      <SectionHeader
        title="Categories"
        subtitle="Browse by type"
        action={<button className="btn btn-sm btn-primary">Random category</button>}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sampleCategories.map((cat) => (
          <CategoryCard key={cat} label={cat} />
        ))}
      </div>
    </section>
  );
}
