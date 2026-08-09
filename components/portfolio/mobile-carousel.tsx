"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function MobileCarousel({
  children,
  ariaLabel,
}: {
  children: React.ReactNode;
  ariaLabel: string;
}) {
  const viewport = useRef<HTMLDivElement | null>(null);

  const move = (direction: number) => {
    viewport.current?.scrollBy({
      left: direction * (viewport.current.clientWidth || 320),
      behavior: "smooth",
    });
  };

  return (
    <div role="region" aria-label={ariaLabel} className="relative">
      <div
        ref={viewport}
        className="flex snap-x snap-mandatory overflow-x-auto scrollbar-none [&>*]:min-w-full [&>*]:snap-start"
      >
        {children}
      </div>
      <div className="flex justify-end gap-2 border-t border-rule-soft p-4">
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="Previous slide"
          className="grid h-9 w-9 place-items-center border border-ink bg-canvas text-ink transition-colors hover:bg-ink hover:text-ink-inverse"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label="Next slide"
          className="grid h-9 w-9 place-items-center border border-ink bg-canvas text-ink transition-colors hover:bg-ink hover:text-ink-inverse"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
