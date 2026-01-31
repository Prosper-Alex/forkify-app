import { useMemo, useState } from "react";
import BookmarkCard from "../components/bookmarks/BookmarkCard.jsx";

const sample = [
  {
    id: "1",
    title: "Teriyaki Chicken",
    category: "Dinner",
    area: "Japanese",
    tags: ["savory"],
    image:
      "https://images.unsplash.com/photo-1604908177445-03e3ba9694f1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    title: "Tiramisu",
    category: "Dessert",
    area: "Italian",
    tags: ["sweet"],
    image:
      "https://images.unsplash.com/photo-1504674900247-08a16b5e43cd?auto=format&fit=crop&w=800&q=80",
  },
];

const tabs = ["All", "Breakfast", "Dinner", "Dessert", "Custom"];
const sortOptions = ["Name", "Category", "Area", "Recently added"];

export default function BookmarksPage() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [sort, setSort] = useState("Recently added");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return sample.filter(
      (m) =>
        (!q ||
          m.title.toLowerCase().includes(q) ||
          m.category.toLowerCase().includes(q) ||
          m.area.toLowerCase().includes(q)) &&
        (activeTab === "All" || m.category.toLowerCase() === activeTab.toLowerCase()),
    );
  }, [query, activeTab]);

  return (
    <section className="flex w-full flex-col gap-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-base-content/60">Bookmarks</p>
          <h1 className="text-3xl font-bold">Saved meals</h1>
        </div>
        <div className="flex items-center gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input input-bordered input-sm w-56"
            placeholder="Search bookmarks"
          />
          <select
            className="select select-bordered select-sm"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            {sortOptions.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </header>

      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`btn btn-sm rounded-full ${
              activeTab === tab ? "btn-primary text-white" : "btn-ghost border border-base-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-base-300 bg-base-100 p-10 text-center">
          <p className="text-lg font-semibold">No bookmarks yet</p>
          <p className="text-base-content/70">Save a meal to see it here.</p>
          <a className="btn btn-primary" href="/">
            Explore meals
          </a>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((meal) => (
            <BookmarkCard key={meal.id} meal={meal} onRemove={() => {}} />
          ))}
        </div>
      )}
    </section>
  );
}
