export default function AddToShoppingButton({ onClick, disabled = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="btn btn-outline border-emerald-200 text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50 disabled:border-base-200 disabled:text-base-content/50"
    >
      Add ingredients to Shopping List
    </button>
  );
}
