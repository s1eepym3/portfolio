export default function Hairline({ className = "" }) {
  return (
    <div className={`w-full h-px bg-[var(--line)] ${className}`} />
  );
}
