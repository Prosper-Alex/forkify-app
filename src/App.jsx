import { NavLink, Route, Routes, Link } from "react-router-dom";

import HomePage from "./pages/index.jsx";
import AboutPage from "./pages/about.jsx";

function App() {
  const navLinkClass = ({ isActive }) =>
    `btn btn-sm btn-ghost ${isActive ? "btn-active" : ""}`;

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <header className="navbar bg-base-100 shadow">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="btn btn-ghost normal-case text-xl font-semibold">
            forkify
          </Link>
          <nav className="flex gap-2">
            <NavLink to="/" className={navLinkClass} end>
              Home
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="container mx-auto flex flex-1 items-center justify-center px-6 py-12">
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<AboutPage />} path="/about" />
        </Routes>
      </main>
    </div>
  );
}

export default App;
