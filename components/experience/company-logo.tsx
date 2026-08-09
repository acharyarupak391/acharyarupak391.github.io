type CompanyLogoProps = {
  label: string;
  lines?: [string, string];
};

export function CompanyLogo({ label, lines }: CompanyLogoProps) {
  return (
    <div className="shrink-0 w-16 h-16 md:w-20 md:h-20 bg-foreground text-background border-4 border-foreground flex flex-col items-center justify-center font-black uppercase leading-none select-none">
      {lines ? (
        <>
          <span className="text-[10px] md:text-xs tracking-tight">
            {lines[0]}
          </span>
          <span className="text-[10px] md:text-xs tracking-tight mt-0.5">
            {lines[1]}
          </span>
        </>
      ) : (
        <span className="text-2xl md:text-3xl tracking-tight">{label}</span>
      )}
    </div>
  );
}
