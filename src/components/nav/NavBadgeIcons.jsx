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
  return (
    <button
      type="button"
      className="relative btn btn-circle btn-ghost"
      title={label}
      aria-label={label}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        className="h-5 w-5"
      >
        <path d={iconPath} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="badge indicator-item badge-primary badge-sm absolute -right-1 -top-1">
        {display}
      </span>
    </button>
  );
}
