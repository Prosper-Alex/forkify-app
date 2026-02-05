import { createContext, useCallback, useContext, useMemo } from "react";
import useLocalStorageState from "../hooks/useLocalStorageState.jsx";

const BookmarksContext = createContext(null);

function newId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function toBookmark(recipe) {
  const category = recipe.category || "";
  const area = recipe.area || "";
  return {
    id: recipe.id,
    title: recipe.title,
    category,
    area,
    tags: recipe.tags ?? [],
    image: recipe.image,
    addedAt: newId(),
  };
}

export function BookmarksProvider({ children }) {
  const [bookmarks, setBookmarks] = useLocalStorageState("forkify:bookmarks", []);

  const isBookmarked = useCallback(
    (id) => bookmarks.some((b) => b.id === id),
    [bookmarks],
  );

  const addBookmark = useCallback(
    (recipe) => {
      if (!recipe?.id) return;
      setBookmarks((prev) => {
        if (prev.some((b) => b.id === recipe.id)) return prev;
        return [toBookmark(recipe), ...prev];
      });
    },
    [setBookmarks],
  );

  const removeBookmark = useCallback(
    (id) => setBookmarks((prev) => prev.filter((b) => b.id !== id)),
    [setBookmarks],
  );

  const toggleBookmark = useCallback(
    (recipe) => {
      if (!recipe?.id) return;
      setBookmarks((prev) => {
        const exists = prev.some((b) => b.id === recipe.id);
        if (exists) return prev.filter((b) => b.id !== recipe.id);
        return [toBookmark(recipe), ...prev];
      });
    },
    [setBookmarks],
  );

  const clearBookmarks = useCallback(() => setBookmarks([]), [setBookmarks]);

  const value = useMemo(
    () => ({
      bookmarks,
      count: bookmarks.length,
      isBookmarked,
      addBookmark,
      removeBookmark,
      toggleBookmark,
      clearBookmarks,
    }),
    [bookmarks, isBookmarked, addBookmark, removeBookmark, toggleBookmark, clearBookmarks],
  );

  return <BookmarksContext.Provider value={value}>{children}</BookmarksContext.Provider>;
}

export function useBookmarks() {
  const ctx = useContext(BookmarksContext);
  if (!ctx) throw new Error("useBookmarks must be used within BookmarksProvider");
  return ctx;
}
