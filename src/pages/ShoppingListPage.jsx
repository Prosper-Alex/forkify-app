import { useEffect, useMemo, useState } from "react";
import PageTitle from "../components/layout/PageTitle.jsx";
import { useShoppingList } from "../contexts/ShoppingListContext.jsx";
import useDocumentTitle from "../hooks/useDocumentTitle.jsx";

export default function ShoppingListPage() {
  const { toBuy, checked, addItems, toggleChecked, removeItem, clearChecked, clearAll } =
    useShoppingList();
  const [draft, setDraft] = useState({ name: "", quantity: "" });
  const [notice, setNotice] = useState(null);
  useDocumentTitle("Shopping List");

  useEffect(() => {
    if (!notice) return undefined;
    const t = setTimeout(() => setNotice(null), 2400);
    return () => clearTimeout(t);
  }, [notice]);

  const canAdd = draft.name.trim().length > 0;

  const copyText = useMemo(() => {
    const lines = [
      ...toBuy.map((i) => `- ${i.quantity ? `${i.quantity} ` : ""}${i.name}`),
      ...(checked.length ? ["", "Checked:", ...checked.map((i) => `- ${i.quantity ? `${i.quantity} ` : ""}${i.name}`)] : []),
    ];
    return lines.join("\n").trim();
  }, [toBuy, checked]);

  const handleAdd = () => {
    if (!canAdd) return;
    addItems([{ name: draft.name, quantity: draft.quantity }]);
    setDraft({ name: "", quantity: "" });
    setNotice({ type: "success", text: "Added to your shopping list." });
  };

  const handleCopy = async () => {
    if (!copyText) {
      setNotice({ type: "info", text: "Nothing to copy yet." });
      return;
    }
    try {
      await navigator.clipboard.writeText(copyText);
      setNotice({ type: "success", text: "Copied to clipboard." });
    } catch {
      setNotice({ type: "info", text: "Copy failed — your browser may block clipboard access." });
    }
  };

  return (
    <section className="flex w-full flex-col gap-6">
      <PageTitle
        title="Groceries"
        eyebrow="Shopping List"
        action={
          <div className="flex flex-wrap gap-2">
          <button type="button" className="btn btn-sm btn-outline" onClick={clearChecked}>
            Clear checked
          </button>
          <button type="button" className="btn btn-sm btn-outline" onClick={clearAll}>
            Clear all
          </button>
          <button type="button" className="btn btn-sm btn-primary" onClick={handleCopy}>
            Copy list
          </button>
          </div>
        }
      />

      {notice && (
        <div
          role="status"
          className={`rounded-xl border px-3 py-2 text-sm ${
            notice.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-base-200 bg-base-50 text-base-content/70"
          }`}
        >
          {notice.text}
        </div>
      )}

      <div className="flex flex-col gap-3 rounded-2xl border border-base-200 bg-base-100 p-4 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            value={draft.name}
            onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
            className="input input-bordered flex-1"
            placeholder="Add item (e.g., basil)"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAdd();
            }}
          />
          <input
            value={draft.quantity}
            onChange={(e) => setDraft((d) => ({ ...d, quantity: e.target.value }))}
            className="input input-bordered sm:w-40"
            placeholder="Qty (optional)"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAdd();
            }}
          />
          <button
            type="button"
            className="btn btn-primary sm:w-32"
            disabled={!canAdd}
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      </div>

      <ListSection
        title="To buy"
        items={toBuy}
        onToggle={toggleChecked}
        onRemove={removeItem}
      />
      <ListSection
        title="Checked"
        items={checked}
        emptyLabel="Nothing checked off yet."
        onToggle={toggleChecked}
        onRemove={removeItem}
      />

      {toBuy.length === 0 && checked.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-base-300 bg-base-100 p-10 text-center">
          <p className="text-lg font-semibold">List is empty</p>
          <p className="text-base-content/70">Add ingredients from any recipe to see them here.</p>
        </div>
      )}
    </section>
  );
}

function ListSection({ title, items, emptyLabel = "No items here.", onToggle, onRemove }) {
  return (
    <div className="rounded-2xl border border-base-200 bg-base-100 p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="text-xs text-base-content/60">{items.length} items</span>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-base-content/70">{emptyLabel}</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-3 rounded-lg border border-base-200 bg-base-50 px-3 py-2"
            >
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={Boolean(item.checked)}
                onChange={() => onToggle?.(item.id)}
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                {item.quantity && <p className="text-xs text-base-content/60">{item.quantity}</p>}
              </div>
              <button type="button" className="btn btn-xs btn-ghost" onClick={() => onRemove?.(item.id)}>
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
