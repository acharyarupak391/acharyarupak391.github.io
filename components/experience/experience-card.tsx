import { Calendar, MapPin } from "lucide-react";
import { CompanyLogo } from "./company-logo";
import type { ExperienceItem } from "./experience-data";

type ExperienceCardProps = {
  experience: ExperienceItem;
};

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div
      className={`${experience.color} relative border-4 border-foreground shadow-brutal-lg p-5 md:p-7 transition-all duration-300 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1`}
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <CompanyLogo
              label={experience.logoLabel}
              lines={experience.logoLines}
            />
            <div>
              <h3 className="text-2xl md:text-3xl font-black leading-tight">
                {experience.company}
              </h3>
              <p className="mt-2 inline-block px-3 py-1 bg-background border-2 border-foreground font-bold text-sm md:text-base">
                {experience.role}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-3 md:items-start">
            <span className="flex items-center gap-2 px-3 py-2 bg-background border-2 border-foreground font-mono text-xs md:text-sm font-bold">
              <Calendar className="w-4 h-4" />
              {experience.period}
            </span>
            <span className="flex items-center gap-2 px-3 py-2 bg-background border-2 border-foreground font-mono text-xs md:text-sm font-bold">
              <MapPin className="w-4 h-4" />
              {experience.location}
            </span>
          </div>
        </div>

        <ul className="grid md:grid-cols-2 gap-3">
          {experience.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-start gap-3 bg-background p-3 border-2 border-foreground transition-all duration-200 hover:bg-neo-yellow/30 hover:translate-x-1"
            >
              <span className="text-lg font-black leading-tight">→</span>
              <span className="text-sm md:text-base leading-snug">
                {highlight}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
