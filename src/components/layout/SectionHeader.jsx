export default function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div>
        {subtitle && (
          <p className="text-xs uppercase tracking-[0.2em] text-base-content/60">{subtitle}</p>
        )}
        <h2 className="text-2xl font-bold text-base-content">{title}</h2>
      </div>
      {action ? <div className="flex items-center gap-2">{action}</div> : null}
    </div>
  );
}
