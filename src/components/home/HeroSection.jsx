import SearchBar from "../search-history/SearchBar.jsx";
import RecentChips from "../search-history/RecentChips.jsx";

export default function HeroSection({
  query,
  setQuery,
  addHistory,
  history,
  onClearHistory,
  onRemoveHistory,
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-100 via-orange-50 to-rose-100 px-8 py-10 shadow-lg ring-1 ring-orange-200/60">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.9),transparent_45%)]" />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
            Forkify Kitchen
          </p>
          <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
            Find a recipe, cook it fully, enjoy the win.
          </h1>
          <p className="text-base text-slate-700 md:text-lg">
            Premium browsing with instant details, bookmarks, and a ready-to-go shopping list.
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex-1">
                <SearchBar
                  value={query}
                  onChange={setQuery}
                  onSubmit={addHistory}
                  history={history}
                  onSelectHistory={(term) => setQuery(term)}
                  onRemoveHistory={onRemoveHistory}
                  onClearHistory={onClearHistory}
                />
              </div>
              <button type="button" className="btn btn-primary shadow-sm sm:w-44">
                Random Meal
              </button>
            </div>
            <RecentChips items={history} onSelect={(term) => setQuery(term)} />
          </div>
        </div>
        <div className="glass relative rounded-2xl bg-white/70 p-6 shadow-lg">
          <dl className="grid grid-cols-2 gap-4 text-sm text-slate-700">
            <Stat label="Recipes" value="Live" />
            <Stat label="Average time" value="~30 min" />
            <Stat label="Bookmarks" value="Saved for later" />
            <Stat label="Shopping list" value="One click" />
          </dl>
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
