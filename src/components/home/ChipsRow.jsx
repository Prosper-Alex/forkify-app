export default function ChipsRow({ items = [], label }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.length === 0 ? (
        <span className="text-sm text-base-content/70">No {label?.toLowerCase()} yet.</span>
      ) : (
        items.map((item) => (
          <button
            key={item}
            type="button"
            className="badge badge-outline border-base-200 bg-base-100 text-base-content hover:border-amber-300 hover:text-amber-700"
          >
            {item}
          </button>
        ))
      )}
    </div>
  );
}
