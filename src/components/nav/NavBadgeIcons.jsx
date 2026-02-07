export default function NavBadgeIcons({ bookmarks = 0, shopping = 0 }) {
  return (
    <div className="flex items-center gap-3">
      <BadgeIcon
        label="Bookmarks"
        count={bookmarks}
        iconPath="M5 5.5A2.5 2.5 0 0 1 7.5 3h9A2.5 2.5 0 0 1 19 5.5v14l-7-3-7 3z"
      />
      <BadgeIcon
        label="Shopping List"
        count={shopping}
        iconPath="M6 6h12M6 10h12M9 14h6M10 18h4"
      />
    </div>
  );
}

function BadgeIcon({ label, count, iconPath }) {
  const display = count > 99 ? "99+" : count.toString();
  const isBookmark = label === "Bookmarks";
  return (
    <button
      type="button"
      className="relative btn btn-circle btn-ghost text-base-content transition-all duration-300 ease-out hover:scale-105 hover:bg-amber-100/70 hover:text-amber-700 active:scale-95"
      title={label}
      aria-label={label}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={isBookmark ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={isBookmark ? "1.2" : "1.8"}
        className="h-5 w-5"
      >
        <path d={iconPath} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="badge indicator-item badge-sm absolute -right-1 -top-1 border-0 bg-amber-500 text-white">
        {display}
      </span>
    </button>
  );
}
