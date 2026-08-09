export function ExperienceHeader() {
  return (
    <div className="text-center mb-12 md:mb-16 relative">
      <div className="relative inline-block">
        <svg
          aria-hidden
          viewBox="0 0 90 70"
          className="absolute -left-16 -top-6 w-16 h-16 md:w-20 md:h-20 hidden sm:block"
        >
          <path
            d="M5,10 Q 30,5 55,30 T 80,55"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M70,48 L80,55 L72,62"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="inline-block px-6 py-3 bg-neo-blue border-4 border-foreground shadow-brutal transform -rotate-2">
          <span className="font-bold uppercase tracking-widest">
            Work History
          </span>
        </div>
      </div>

      <h2 className="mt-8 text-4xl md:text-6xl lg:text-7xl font-black leading-[0.95]">
        WHERE I&apos;VE
        <br />
        <span className="text-neo-pink [-webkit-text-stroke:2px_black] md:[-webkit-text-stroke:3px_black]">
          WORKED
        </span>
      </h2>

      <p className="mt-6 max-w-xl mx-auto font-mono text-base md:text-lg">
        A journey of building, learning and{" "}
        <span className="relative inline-block">
          <span className="relative z-10">creating impact.</span>
          <span className="absolute left-0 right-0 bottom-0 h-2 bg-neo-yellow -z-0" />
        </span>
      </p>
    </div>
  );
}
