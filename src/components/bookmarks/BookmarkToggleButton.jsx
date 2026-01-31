import { useState } from "react";

export default function BookmarkToggleButton({
  initialOn = false,
  onToggle,
  size = "md",
}) {
  const [on, setOn] = useState(initialOn);
  const sizes = { sm: "h-8 w-8", md: "h-9 w-9", lg: "h-10 w-10" };

  const handleClick = () => {
    const next = !on;
    setOn(next);
    onToggle?.(next);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`btn btn-circle btn-ghost ${sizes[size]} border border-base-200 hover:border-amber-400`}
      aria-pressed={on}
      title={on ? "Remove bookmark" : "Add bookmark"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={on ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-5 w-5 text-amber-500"
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
