import { useState } from "react";
import { NavLink, Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/index.jsx";
import AboutPage from "./pages/about.jsx";
import BookmarksPage from "./pages/BookmarksPage.jsx";
import ShoppingListPage from "./pages/ShoppingListPage.jsx";
import NavBadgeIcons from "./components/nav/NavBadgeIcons.jsx";
// import logo from "../public/logo.png";

function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [counts] = useState({ bookmarks: 3, shopping: 5 });
  const navLinkClass = ({ isActive }) =>
    `btn btn-sm btn-ghost ${isActive ? "btn-active text-amber-600" : ""}`;
  const navItems = [
    { to: "/", label: "Home", end: true },
    { to: "/bookmarks", label: "Bookmarks" },
    { to: "/shopping-list", label: "Shopping List" },
    { to: "/about", label: "About" },
  ];

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <header className="sticky top-0 z-30 bg-base-100/90 shadow backdrop-blur">
        <div className="container mx-auto flex items-center justify-between px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <img src="/favicon.ico" className="h-9 w-9" alt="Forkify logo" />
              <span className="hidden text-lg md:inline">Forkify Kitchen</span>
            </Link>
          </div>

          <button
            type="button"
            className="btn btn-ghost btn-sm md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={navOpen}
            onClick={() => setNavOpen((open) => !open)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}
            <a
              className="btn btn-sm btn-primary shadow-sm"
              href="#recipes"
              onClick={() => setNavOpen(false)}
            >
              Browse recipes
            </a>
            <NavBadgeIcons bookmarks={counts.bookmarks} shopping={counts.shopping} />
          </nav>
        </div>

        {navOpen && (
          <div className="border-t border-base-200 bg-base-100 md:hidden">
            <nav className="container mx-auto flex flex-col gap-2 px-4 py-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={navLinkClass}
                  onClick={() => setNavOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              <a
                className="btn btn-sm btn-primary shadow-sm"
                href="#recipes"
                onClick={() => setNavOpen(false)}
              >
                Browse recipes
              </a>
            </nav>
          </div>
        )}
      </header>

      <main className="container mx-auto flex flex-1 px-6 py-12">
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<BookmarksPage />} path="/bookmarks" />
          <Route element={<ShoppingListPage />} path="/shopping-list" />
          <Route element={<AboutPage />} path="/about" />
        </Routes>
      </main>
    </div>
  );
}

export default App;
