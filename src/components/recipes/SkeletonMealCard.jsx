export default function SkeletonMealCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-base-200 bg-base-100">
      <div className="h-36 w-full bg-base-200" />
      <div className="space-y-2 p-4">
        <div className="h-4 w-2/3 rounded bg-base-200" />
        <div className="h-3 w-1/2 rounded bg-base-200" />
        <div className="flex gap-2 pt-2">
          <div className="h-4 w-12 rounded-full bg-base-200" />
          <div className="h-4 w-10 rounded-full bg-base-200" />
        </div>
      </div>
    </div>
  );
}
