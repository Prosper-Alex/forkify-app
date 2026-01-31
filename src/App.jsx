import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/index.jsx";
import AboutPage from "./pages/about.jsx";
import BookmarksPage from "./pages/BookmarksPage.jsx";
import ShoppingListPage from "./pages/ShoppingListPage.jsx";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import AreasPage from "./pages/AreasPage.jsx";
import IngredientsPage from "./pages/IngredientsPage.jsx";
import Navbar from "./components/nav/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";

function App() {
  const [counts] = useState({ bookmarks: 3, shopping: 5 });

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <Navbar counts={counts} />
      <main className="container mx-auto flex flex-1 px-6 py-12">
        <Routes>
          <Route element={<HomePage />} path="/" />
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
