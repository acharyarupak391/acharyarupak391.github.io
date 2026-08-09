import { Tag } from "./tag";

export function SectionHeader({
  index,
  title,
  file,
  subtitle,
  numeral,
  variant = "default",
}: {
  index: string;
  title: string;
  file: string;
  subtitle: string;
  numeral: string;
  variant?: "default" | "soft";
}) {
  const inverse = variant === "soft";

  return (
    <header
      className={`relative overflow-hidden rule-b ${inverse ? "surface-soft" : "surface-canvas"}`}
      aria-labelledby={`${title.toLowerCase().replace(/\s+/g, "-")}-title`}
    >
      <span
        aria-hidden="true"
        className="section-numeral"
        style={{ right: "1.5rem", top: "50%", transform: "translateY(-50%)" }}
      >
        {numeral}
      </span>
      <div className="relative z-10 grid grid-cols-12 gap-4 items-end px-5 py-8 md:px-8 md:py-12">
        <div className="col-span-3 md:col-span-2">
          <Tag variant="accent">SEC · {index}</Tag>
        </div>
        <div className="col-span-9 md:col-span-7">
          <h2
            id={`${title.toLowerCase().replace(/\s+/g, "-")}-title`}
            className="font-display text-[clamp(2.25rem,7vw,5rem)] uppercase leading-[0.85] tracking-tight"
          >
            {title}
          </h2>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-ink-soft">
            {subtitle}
          </p>
        </div>
        <div className="hidden md:flex col-span-3 flex-col items-end gap-1">
          <Tag>{file}</Tag>
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint">
            {`${index} / 06`}
          </span>
        </div>
      </div>
    </header>
  );
}
