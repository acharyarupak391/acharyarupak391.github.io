export function Marquee() {
  const items = [
    "REACT",
    "★",
    "NEXT.JS",
    "★",
    "NODE.JS",
    "★",
    "WEB3",
    "★",
    "TYPESCRIPT",
    "★",
    "PYTHON",
    "★",
    "BLOCKCHAIN",
    "★",
    "GOLANG",
    "★",
  ];

  return (
    <div className="relative py-6 bg-foreground text-background border-y-4 border-foreground overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex">
        {[...items, ...items].map((item, index) => (
          <span
            key={index}
            className="mx-4 md:mx-8 text-2xl md:text-4xl font-black uppercase tracking-wider"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
