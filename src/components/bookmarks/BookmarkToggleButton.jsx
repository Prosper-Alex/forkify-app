import { useState } from "react";

export default function BookmarkToggleButton({
  on: controlledOn,
  initialOn = false,
  onToggle,
  size = "md",
  stopPropagation = true,
  disabled = false,
}) {
  const [uncontrolledOn, setUncontrolledOn] = useState(initialOn);
  const on = controlledOn ?? uncontrolledOn;
  const sizes = { sm: "h-8 w-8", md: "h-9 w-9", lg: "h-10 w-10" };
  const buttonTone = on
    ? "bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/40"
    : "bg-amber-500/90 text-white border-amber-400 shadow-sm shadow-amber-500/25";

  const handleClick = (e) => {
    if (stopPropagation) e.stopPropagation();
    if (disabled) return;
    const next = !on;
    if (controlledOn == null) setUncontrolledOn(next);
    onToggle?.(next);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`btn btn-circle ${sizes[size]} border transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 hover:bg-amber-600 hover:shadow-md active:scale-95 disabled:opacity-60 ${buttonTone}`}
      aria-pressed={on}
      title={on ? "Remove bookmark" : "Add bookmark"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={on ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 5.25A2.25 2.25 0 0 1 8.25 3h7.5A2.25 2.25 0 0 1 18 5.25v14.19l-6-3-6 3V5.25Z"
        />
      </svg>
    </button>
  );
}

