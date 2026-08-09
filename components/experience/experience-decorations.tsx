function PlusSign({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    >
      <path d="M12 4 V20 M4 12 H20" />
    </svg>
  );
}

function Zigzag({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 80 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2,12 L14,2 L26,22 L38,2 L50,22 L62,2 L74,22" />
    </svg>
  );
}

function DotGrid({
  className,
  rows = 5,
  cols = 5,
}: {
  className?: string;
  rows?: number;
  cols?: number;
}) {
  const dots = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push(
        <circle
          key={`${r}-${c}`}
          cx={c * 8 + 4}
          cy={r * 8 + 4}
          r={1.5}
          fill="currentColor"
        />
      );
    }
  }
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${cols * 8} ${rows * 8}`}
      className={className}
    >
      {dots}
    </svg>
  );
}

export function ExperienceDecorations() {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none">
      {/* Top-left stacked squares */}
      <div className="absolute top-16 left-4 md:left-12 hidden md:block">
        <div className="relative">
          <div className="absolute -left-3 top-3 w-12 h-12 bg-neo-blue border-4 border-foreground" />
          <div className="w-16 h-16 bg-neo-yellow border-4 border-foreground rotate-12" />
        </div>
      </div>

      {/* Top-right pink circle */}
      <div className="absolute top-32 right-8 md:right-20 hidden md:block">
        <div className="w-14 h-14 lg:w-20 lg:h-20 bg-neo-pink border-4 border-foreground rounded-full" />
      </div>

      {/* Top-right zigzag */}
      <div className="absolute top-20 right-32 lg:right-48 text-foreground hidden lg:block">
        <Zigzag className="w-24 h-8" />
      </div>

      {/* Yellow plus signs - upper area */}
      <div className="absolute top-44 right-12 text-neo-yellow hidden md:block">
        <PlusSign className="w-8 h-8" />
      </div>
      <div className="absolute top-72 right-4 text-neo-yellow hidden md:block">
        <PlusSign className="w-6 h-6" />
      </div>
      <div className="absolute top-1/3 left-6 text-neo-yellow hidden lg:block">
        <PlusSign className="w-7 h-7" />
      </div>

      {/* Mid dot grids */}
      <div className="absolute top-1/4 right-1/3 text-foreground/40 hidden md:block">
        <DotGrid className="w-16 h-16" rows={6} cols={6} />
      </div>
      <div className="absolute top-2/3 left-1/3 text-foreground/40 hidden lg:block">
        <DotGrid className="w-12 h-12" rows={4} cols={4} />
      </div>
      <div className="absolute bottom-40 right-1/4 text-foreground/40 hidden md:block">
        <DotGrid className="w-14 h-14" rows={5} cols={5} />
      </div>

      {/* Mid-right blue square */}
      <div className="absolute top-1/2 right-4 lg:right-12 hidden md:block">
        <div className="w-12 h-12 lg:w-16 lg:h-16 bg-neo-blue border-4 border-foreground -rotate-12" />
      </div>

      {/* Mid-left blue zigzag pattern */}
      <div className="absolute top-1/2 left-2 text-neo-blue hidden md:block">
        <Zigzag className="w-16 h-6" />
      </div>

      {/* Bottom-left green triangle area */}
      <div className="absolute bottom-32 left-4 hidden md:block">
        <div className="w-14 h-14 bg-neo-green border-4 border-foreground rotate-45" />
      </div>

      {/* Bottom-left pink small */}
      <div className="absolute bottom-20 left-20 hidden md:block">
        <div className="w-8 h-8 bg-neo-pink border-4 border-foreground" />
      </div>

      {/* Bottom-right yellow zigzag */}
      <div className="absolute bottom-24 right-8 text-foreground hidden md:block">
        <Zigzag className="w-20 h-6" />
      </div>

      {/* Bottom-right plus */}
      <div className="absolute bottom-40 right-2 text-foreground hidden md:block">
        <PlusSign className="w-8 h-8" />
      </div>

      {/* Bottom plus center */}
      <div className="absolute bottom-1/3 left-1/4 text-foreground hidden lg:block">
        <PlusSign className="w-6 h-6" />
      </div>

      {/* Pink cross-shape */}
      <div className="absolute bottom-12 right-1/3 text-neo-pink hidden lg:block">
        <PlusSign className="w-10 h-10" />
      </div>
    </div>
  );
}
