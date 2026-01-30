export default function AboutPage() {
  return (
    <section className="flex min-h-[50vh] flex-col items-center justify-center text-center gap-3">
      <h1 className="text-4xl font-semibold">About</h1>
      <p className="text-base-content/80 max-w-xl">
        Forkify React is a minimal demo that uses TheMealDB for live recipes, TanStack Query for data
        fetching, and a responsive card/detail layout built with Vite and Tailwind.
      </p>
    </section>
  );
}
