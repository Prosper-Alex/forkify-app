import { NavLink, Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/index.jsx";
import AboutPage from "./pages/about.jsx";
// import logo from "../public/logo.png";

function App() {
  const navLinkClass = ({ isActive }) =>
    `btn btn-sm btn-ghost ${isActive ? "btn-active" : ""}`;

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <header className="navbar bg-base-100 shadow">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="btn btn-ghost normal-case font-semibold">
            <img src="/favicon.ico" className="h-10 w-10" alt="Forkify logo" />
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

      <main className="container mx-auto flex flex-1 px-6 py-12">
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<AboutPage />} path="/about" />
        </Routes>
      </main>
    </div>
  );
}

export default App;
