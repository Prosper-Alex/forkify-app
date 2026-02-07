const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/#categories" },
  { label: "Cuisines", href: "/#areas" },
  { label: "Ingredients", href: "/#ingredients" },
  { label: "Bookmarks", href: "/bookmarks" },
  { label: "Shopping List", href: "/shopping-list" },
  { label: "About", href: "/about" },
];

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-base-200 bg-base-100">
      <div className="container mx-auto grid gap-10 px-6 py-10 md:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <img
              src="/favicon.png"
              className="h-10 w-100% mb-6"
              alt="Forkify logo"
            />
          </div>
          <p className="text-sm text-base-content/70">
            Premium recipe browsing powered by TheMealDB with quick bookmarks
            and shopping lists.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-base-content/60">
            Quick links
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a className="hover:text-amber-600" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-base-content/60">
            Helpful
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a className="hover:text-amber-600" href="#">
                Privacy
              </a>
            </li>
            <li>
              <a className="hover:text-amber-600" href="#">
                Terms
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-base-content/60">
            Social
          </p>
          <div className="mt-3 flex gap-3">
            {["Twitter", "Instagram", "YouTube"].map((name) => (
              <span
                key={name}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-base-200 text-sm text-base-content/70"
                title={name}>
                {name[0]}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-base-200 py-4 text-center text-xs text-base-content/60">
        © {new Date().getFullYear()} Forkify Kitchen. All rights reserved.
      </div>
    </footer>
  );
}
