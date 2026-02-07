import PageTitle from "../components/layout/PageTitle.jsx";
import ChipsRow from "../components/home/ChipsRow.jsx";
import useDocumentTitle from "../hooks/useDocumentTitle.jsx";

const ingredientsSample = [
  "Chicken",
  "Beef",
  "Salmon",
  "Prawn",
  "Tomato",
  "Onion",
  "Garlic",
  "Basil",
  "Cumin",
  "Paprika",
  "Rice",
  "Pasta",
  "Potato",
  "Egg",
  "Milk",
  "Cheese",
];

export default function IngredientsPage() {
  useDocumentTitle("Ingredients");

  return (
    <section className="flex flex-col gap-6 pb-12">
      <PageTitle
        title="Ingredients"
        subtitle="Shop your pantry"
        action={<button className="btn btn-sm btn-primary">See suggestions</button>}
      />
      <div className="rounded-2xl border border-base-200 bg-base-100 p-5">
        <ChipsRow items={ingredientsSample} label="ingredients" />
      </div>
    </section>
  );
}
