import { useState } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import HomePage from "./pages/index.jsx";
import AboutPage from "./pages/about.jsx";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import AreasPage from "./pages/AreasPage.jsx";
import IngredientsPage from "./pages/IngredientsPage.jsx";
import BookmarksPage from "./pages/BookmarksPage.jsx";
import ShoppingListPage from "./pages/ShoppingListPage.jsx";
import MealDetailPage from "./pages/MealDetailPage.jsx";
import NavBadgeIcons from "./components/nav/NavBadgeIcons.jsx";
import Footer from "./components/layout/Footer.jsx";
import { useBookmarks } from "./contexts/BookmarksContext.jsx";
import { useShoppingList } from "./contexts/ShoppingListContext.jsx";
// import logo from "../public/logo.png";

function App() {
  const [navOpen, setNavOpen] = useState(false);
  const { count: bookmarksCount } = useBookmarks();
  const { count: shoppingCount } = useShoppingList();
  const navLinkClass = ({ isActive }) =>
    [
      "btn btn-sm btn-ghost relative overflow-hidden rounded-xl transition-all duration-300 ease-out",
      "hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-amber-100/70 hover:shadow-sm",
      "active:translate-y-0 active:scale-95 active:duration-100",
      isActive
        ? "bg-amber-100 text-amber-700 shadow-sm ring-1 ring-amber-300"
        : "text-base-content/80",
    ].join(" ");
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
              <img
                src="/favicon.png"
                className="h-9 w-100%"
                alt="Forkify logo"
              />
            </Link>
          </div>

          <button
            type="button"
            className="btn btn-ghost btn-sm transition-all duration-300 ease-out hover:scale-105 hover:bg-amber-100/70 active:scale-95 active:duration-100 md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={navOpen}
            onClick={() => setNavOpen((open) => !open)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>

          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}
            <a
              className="btn btn-sm bg-amber-500 text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-amber-600 hover:shadow-md active:scale-95 active:duration-100"
              href="#recipes"
              onClick={() => setNavOpen(false)}>
              Browse recipes
            </a>
            <NavBadgeIcons
              bookmarks={bookmarksCount}
              shopping={shoppingCount}
            />
          </nav>
        </div>

        <div
          className={`overflow-hidden border-t border-base-200 bg-base-100 transition-all duration-300 ease-out md:hidden ${
            navOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}>
          <nav className="container mx-auto flex flex-col gap-2 px-4 py-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={navLinkClass}
                onClick={() => setNavOpen(false)}>
                {item.label}
              </NavLink>
            ))}
            <a
              className="btn btn-sm bg-amber-500 text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-amber-600 hover:shadow-md active:scale-95 active:duration-100"
              href="#recipes"
              onClick={() => setNavOpen(false)}>
              Browse recipes
            </a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto flex flex-1 px-6 py-12">
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<MealDetailPage />} path="/meal/:id" />
          <Route element={<CategoriesPage />} path="/categories" />
          <Route element={<AreasPage />} path="/cuisines" />
          <Route element={<IngredientsPage />} path="/ingredients" />
          <Route element={<BookmarksPage />} path="/bookmarks" />
          <Route element={<ShoppingListPage />} path="/shopping-list" />
          <Route element={<AboutPage />} path="/about" />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
