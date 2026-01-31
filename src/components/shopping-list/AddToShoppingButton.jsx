export default function AddToShoppingButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="btn btn-outline border-emerald-200 text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50"
    >
      Add ingredients to Shopping List
    </button>
  );
}
