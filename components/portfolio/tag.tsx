import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "signal";
  className?: string;
}

/**
 * Tag — bracketed telemetry label, e.g. [ STATUS · ACTIVE ]
 * Single accent color (cobalt) for emphasis; signal (muted green) reserved for status only.
 */
export function Tag({ children, variant = "default", className }: TagProps) {
  const color =
    variant === "accent"
      ? "text-accent"
      : variant === "signal"
      ? "text-signal"
      : "text-ink-soft";

  return (
    <span className={cn("tag-label", color, className)}>
      <span className="px-0.5">{children}</span>
    </span>
  );
}
