export function Eyebrow({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <span
      className={`text-eyebrow inline-flex items-center gap-2 text-accent ${className}`}
    >
      <span className="h-1 w-1 rounded-full bg-current" />
      {children}
    </span>
  );
}
