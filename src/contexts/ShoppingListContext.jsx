import { createContext, useCallback, useContext, useMemo } from "react";
import useLocalStorageState from "../hooks/useLocalStorageState.jsx";

const ShoppingListContext = createContext(null);

function newId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeName(name) {
  return (name || "").trim().toLowerCase();
}

export function ShoppingListProvider({ children }) {
  const [items, setItems] = useLocalStorageState("forkify:shopping", []);

  const toBuy = useMemo(() => items.filter((i) => !i.checked), [items]);
  const checked = useMemo(() => items.filter((i) => i.checked), [items]);

  const addItems = useCallback(
    (newItems) => {
      const incoming = (newItems ?? [])
        .map((i) => ({
          id: i.id || newId(),
          name: (i.name || "").trim(),
          quantity: (i.quantity || "").trim(),
          checked: Boolean(i.checked),
        }))
        .filter((i) => i.name);

      if (incoming.length === 0) return;

      setItems((prev) => {
        const existing = new Set(prev.map((p) => normalizeName(p.name)));
        const deduped = incoming.filter((i) => !existing.has(normalizeName(i.name)));
        return [...deduped, ...prev];
      });
    },
    [setItems],
  );

  const addIngredientsFromRecipe = useCallback(
    (recipe) => {
      const ingredients = recipe?.ingredients ?? [];
      addItems(ingredients.map((name) => ({ name, quantity: "", checked: false })));
    },
    [addItems],
  );

  const toggleChecked = useCallback(
    (id) =>
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)),
      ),
    [setItems],
  );

  const removeItem = useCallback(
    (id) => setItems((prev) => prev.filter((i) => i.id !== id)),
    [setItems],
  );

  const clearChecked = useCallback(
    () => setItems((prev) => prev.filter((i) => !i.checked)),
    [setItems],
  );

  const clearAll = useCallback(() => setItems([]), [setItems]);

  const value = useMemo(
    () => ({
      items,
      toBuy,
      checked,
      count: items.length,
      toBuyCount: toBuy.length,
      addItems,
      addIngredientsFromRecipe,
      toggleChecked,
      removeItem,
      clearChecked,
      clearAll,
    }),
    [
      items,
      toBuy,
      checked,
      addItems,
      addIngredientsFromRecipe,
      toggleChecked,
      removeItem,
      clearChecked,
      clearAll,
    ],
  );

  return <ShoppingListContext.Provider value={value}>{children}</ShoppingListContext.Provider>;
}

export function useShoppingList() {
  const ctx = useContext(ShoppingListContext);
  if (!ctx) throw new Error("useShoppingList must be used within ShoppingListProvider");
  return ctx;
}

