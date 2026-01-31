import { useState } from "react";

const initialToBuy = [
  { id: "1", name: "Chicken thighs", quantity: "1 lb" },
  { id: "2", name: "Soy sauce", quantity: "1/2 cup" },
];
const initialChecked = [{ id: "3", name: "Garlic", quantity: "3 cloves" }];

export default function ShoppingListPage() {
  const [toBuy] = useState(initialToBuy);
  const [checked] = useState(initialChecked);
  const [draft, setDraft] = useState({ name: "", quantity: "" });

  return (
    <section className="flex w-full flex-col gap-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-base-content/60">Shopping List</p>
          <h1 className="text-3xl font-bold">Groceries</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn btn-sm btn-outline">
            Clear checked
          </button>
          <button type="button" className="btn btn-sm btn-outline">
            Clear all
          </button>
          <button type="button" className="btn btn-sm btn-primary">
            Copy list
          </button>
        </div>
      </header>

      <div className="flex flex-col gap-3 rounded-2xl border border-base-200 bg-base-100 p-4 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            value={draft.name}
            onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
            className="input input-bordered flex-1"
            placeholder="Add item (e.g., basil)"
          />
          <input
            value={draft.quantity}
            onChange={(e) => setDraft((d) => ({ ...d, quantity: e.target.value }))}
            className="input input-bordered sm:w-40"
            placeholder="Qty (optional)"
          />
          <button type="button" className="btn btn-primary sm:w-32">
            Add
          </button>
        </div>
      </div>

      <ListSection title="To buy" items={toBuy} />
      <ListSection title="Checked" items={checked} emptyLabel="Nothing checked off yet." />

      {toBuy.length === 0 && checked.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-base-300 bg-base-100 p-10 text-center">
          <p className="text-lg font-semibold">List is empty</p>
          <p className="text-base-content/70">Add ingredients from any recipe to see them here.</p>
        </div>
      )}
    </section>
  );
}

function ListSection({ title, items, emptyLabel = "No items here." }) {
  return (
    <div className="rounded-2xl border border-base-200 bg-base-100 p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="text-xs text-base-content/60">{items.length} items</span>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-base-content/70">{emptyLabel}</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-3 rounded-lg border border-base-200 bg-base-50 px-3 py-2"
            >
              <input type="checkbox" className="checkbox checkbox-sm" />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                {item.quantity && <p className="text-xs text-base-content/60">{item.quantity}</p>}
              </div>
              <button type="button" className="btn btn-xs btn-ghost">
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
