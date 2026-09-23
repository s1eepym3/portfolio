export default function SectionLabel({ number, label }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="font-mono text-[9px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.2em] text-[var(--accent)] whitespace-nowrap">
        {number ? `${number} — ${label}` : label}
      </span>
    </div>
  );
}
