export default function AboutPage() {
  const features = [
    "Search meals",
    "Browse categories",
    "Explore cuisines",
    "Save bookmarks",
    "Build a shopping list",
  ];
  const steps = [
    "Search or pick a category powered by TheMealDB.",
    "Open a meal to view full details instantly.",
    "Bookmark favorites and add ingredients to your shopping list.",
  ];
  const faqs = [
    { q: "Is this data live?", a: "Yes, meals are fetched from TheMealDB." },
    { q: "Do I need an account?", a: "No account required for browsing and bookmarking locally." },
    { q: "Can I export my list?", a: "Copy your shopping list with one click." },
  ];

  return (
    <div className="flex flex-col gap-10 pb-16">
      <section className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-700 px-8 py-12 text-white shadow-lg">
        <h1 className="text-4xl font-bold">About Forkify Kitchen</h1>
        <p className="mt-3 max-w-2xl text-white/80">
          A modern recipe companion built on TheMealDB, crafted for fast discovery, bookmarking, and
          effortless shopping prep.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-base-content">What you can do</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-base-200 bg-base-100 px-4 py-3 shadow-sm"
            >
              <p className="font-medium">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-base-content">How it works</h2>
        <ol className="space-y-2">
          {steps.map((step, idx) => (
            <li
              key={step}
              className="flex items-start gap-3 rounded-xl border border-base-200 bg-base-50 px-4 py-3"
            >
              <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-sm font-semibold text-amber-700">
                {idx + 1}
              </span>
              <p className="text-base-content/80">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-base-content">FAQs</h2>
        <div className="space-y-3">
          {faqs.map((item) => (
            <div
              key={item.q}
              className="rounded-2xl border border-base-200 bg-base-100 px-4 py-3 shadow-sm"
            >
              <p className="font-semibold">{item.q}</p>
              <p className="text-sm text-base-content/70">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-base-200 bg-base-100 px-6 py-5">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-base-content/60">Ready to cook?</p>
          <h3 className="text-xl font-semibold">Jump back to the recipes</h3>
        </div>
        <a className="btn btn-primary" href="/">
          Explore meals
        </a>
      </section>
    </div>
  );
}
