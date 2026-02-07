import PageTitle from "../components/layout/PageTitle.jsx";
import CategoryCard from "../components/categories/CategoryCard.jsx";
import useDocumentTitle from "../hooks/useDocumentTitle.jsx";

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
  useDocumentTitle("Categories");

  return (
    <section className="flex flex-col gap-6 pb-12">
      <PageTitle
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
