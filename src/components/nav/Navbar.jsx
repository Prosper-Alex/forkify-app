import { useMemo, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import NavBadgeIcons from "./NavBadgeIcons.jsx";

const primaryLinks = [
  { label: "Home", to: "/" },
  { label: "Categories", to: "/categories" },
  { label: "Cuisines", to: "/cuisines" },
  { label: "Ingredients", to: "/ingredients" },
  { label: "Bookmarks", to: "/bookmarks" },
  { label: "Shopping List", to: "/shopping-list" },
];

export default function Navbar({ counts = { bookmarks: 0, shopping: 0 } }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const activeLabel = useMemo(() => {
    const match = primaryLinks.find((link) => link.to === location.pathname);
    return match?.label ?? "Menu";
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-30 bg-base-100/90 shadow-sm backdrop-blur">
      <div className="container mx-auto flex items-center justify-between gap-3 px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-3 font-semibold">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 3v8M8 11c0 3.5-2 5.5-2 7a2 2 0 1 0 4 0c0-1.5-2-3.5-2-7m8-8v6m0 0h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2Zm0 0h-2v16"
              />
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm uppercase tracking-[0.25em] text-base-content/70">
              Forkify
            </span>
            <span className="text-lg font-semibold text-base-content">Kitchen</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-base-200 bg-base-100 px-2 py-1 lg:flex">
          {primaryLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `btn btn-ghost btn-sm rounded-full px-3 ${
                  isActive ? "bg-amber-100 text-amber-700" : "text-base-content/80"
                } hover:bg-base-200`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <button
            type="button"
            className="btn btn-circle btn-ghost border border-base-200 hover:border-amber-300"
            title="Search"
          >
            <SearchIcon />
          </button>
          <NavBadgeIcons bookmarks={counts.bookmarks} shopping={counts.shopping} />
        </div>

        <button
          type="button"
          className="btn btn-ghost btn-sm lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-base-200 px-2 py-1 text-xs text-base-content/80">
              {activeLabel}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
        </button>
      </div>

      {open && (
        <div className="border-t border-base-200 bg-base-100 lg:hidden">
          <nav className="container mx-auto flex flex-col gap-2 px-4 py-3">
            {primaryLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-xl border border-base-200 px-4 py-3 ${
                    isActive ? "bg-amber-50 text-amber-700" : "bg-base-50 text-base-content"
                  }`
                }
                onClick={() => setOpen(false)}
              >
                <span>{link.label}</span>
                <span className="text-xs text-base-content/60">Go</span>
              </NavLink>
            ))}
            <div className="flex items-center justify-between rounded-xl border border-base-200 bg-base-50 px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-base-content/80">
                <SearchIcon className="h-4 w-4" /> <span>Search</span>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-primary"
                onClick={() => setOpen(false)}
                aria-label="Search"
              >
                Open
              </button>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <NavBadgeIcons bookmarks={counts.bookmarks} shopping={counts.shopping} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function SearchIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.5 15.5 19 19m-3.5-3.5A5.5 5.5 0 1 0 5 10.5a5.5 5.5 0 0 0 10.5 0Z"
      />
    </svg>
  );
}
