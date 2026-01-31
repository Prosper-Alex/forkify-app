export default function RecentChips({ items = [], onSelect }) {
  if (!items.length) return null;
  const limited = items.slice(0, 5);

  return (
    <div className="flex flex-wrap gap-2">
      {limited.map((chip) => (
        <button
          key={chip}
          type="button"
          onClick={() => onSelect?.(chip)}
          className="badge badge-outline border-base-300 bg-white text-base-content hover:border-amber-300 hover:text-amber-700"
        >
          {chip}
        </button>
      ))}
    </div>
  );
}
