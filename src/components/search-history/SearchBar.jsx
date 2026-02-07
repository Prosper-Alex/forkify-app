import { useEffect, useRef, useState } from "react";

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  history = [],
  onSelectHistory,
  onRemoveHistory,
  onClearHistory,
  placeholder = "Search meals…",
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (!containerRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSubmit?.(value);
      setOpen(false);
    }
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="flex items-center gap-3 rounded-xl bg-base-200 px-4 py-2 focus-within:ring-2 focus-within:ring-amber-400">
        <SearchIcon />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="input input-ghost w-full bg-transparent focus:outline-none"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="btn btn-xs btn-ghost text-base-content/70"
          >
            Clear
          </button>
        )}
      </div>

      {open && (
        <div className="absolute left-0 right-0 mt-2 rounded-2xl border border-base-200 bg-base-100 p-3 shadow-lg">
          <div className="flex items-center justify-between pb-2">
            <p className="text-xs uppercase tracking-[0.2em] text-base-content/60">
              Recent searches
            </p>
            <button
              type="button"
              className="btn btn-xs btn-ghost text-xs"
              onClick={onClearHistory}
            >
              Clear all
            </button>
          </div>

          {history.length === 0 ? (
            <p className="text-sm text-base-content/70">No recent searches.</p>
          ) : (
            <ul className="space-y-2">
              {history.map((item) => (
                <li
                  key={item}
                  className="flex items-center justify-between rounded-lg px-2 py-1 hover:bg-base-200"
                >
                  <button
                    type="button"
                    className="text-sm text-left font-medium"
                    onClick={() => onSelectHistory?.(item)}
                  >
                    {item}
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost btn-xs"
                    onClick={() => onRemoveHistory?.(item)}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5 text-base-content/60"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.5 15.5 19 19m-3.5-3.5A5.5 5.5 0 1 0 5 10.5a5.5 5.5 0 0 0 10.5 0Z"
      />
    </svg>
  );
}
