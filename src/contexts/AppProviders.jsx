import { BookmarksProvider } from "./BookmarksContext.jsx";
import { ShoppingListProvider } from "./ShoppingListContext.jsx";

export default function AppProviders({ children }) {
  return (
    <BookmarksProvider>
      <ShoppingListProvider>{children}</ShoppingListProvider>
    </BookmarksProvider>
  );
}

