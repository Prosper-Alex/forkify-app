export default function CtaStrip() {
  return (
    <section className="overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 px-6 py-8 text-white shadow-lg">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-white/80">Need inspo?</p>
          <h3 className="text-2xl font-semibold">Not sure what to cook tonight?</h3>
          <p className="text-white/90">Roll a random meal or browse categories to spark ideas.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="btn border-0 bg-white text-amber-600 shadow hover:-translate-y-0.5">
            Random Meal
          </button>
          <a className="btn btn-outline border-white text-white hover:bg-white/10" href="/#categories">
            Browse categories
          </a>
        </div>
      </div>
    </section>
  );
}
