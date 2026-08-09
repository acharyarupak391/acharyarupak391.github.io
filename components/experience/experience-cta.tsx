import { Handshake } from "lucide-react";

export function ExperienceCta() {
  return (
    <div className="mt-16 flex justify-center">
      <div className="flex flex-col sm:flex-row items-stretch gap-0 border-4 border-foreground shadow-brutal-lg bg-background">
        <div className="flex items-center gap-3 px-5 py-4 bg-neo-pink border-b-4 sm:border-b-0 sm:border-r-4 border-foreground">
          <div className="p-2 bg-background border-2 border-foreground">
            <Handshake className="w-5 h-5" />
          </div>
          <span className="font-black uppercase tracking-wider text-sm md:text-base">
            Interested in working together?
          </span>
        </div>
        <a
          href="#contact"
          className="flex items-center justify-center gap-2 px-6 py-4 bg-neo-yellow font-black uppercase tracking-wider text-sm md:text-base transition-colors hover:bg-neo-pink"
        >
          Let&apos;s Talk
          <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}
