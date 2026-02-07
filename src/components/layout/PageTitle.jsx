export default function PageTitle({
  title,
  subtitle,
  eyebrow,
  action = null,
  className = "",
}) {
  return (
    <header
      className={`flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ${className}`.trim()}>
      <div>
        {eyebrow ? (
          <p className="font-display text-xs uppercase tracking-[0.24em] text-amber-700/80">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display title-gradient text-4xl font-black leading-tight drop-shadow-[0_4px_14px_rgba(217,119,6,0.25)] md:text-5xl">
          {title}
        </h1>
        {subtitle ? <p className="text-sm text-base-content/70">{subtitle}</p> : null}
      </div>
      {action ? <div className="flex flex-wrap gap-2">{action}</div> : null}
    </header>
  );
}
