"use client";

import { useReportWebVitals } from "next/web-vitals";
import { FC } from "react";

export const WebVitals: FC = () => {
  useReportWebVitals((metric) => {
    // Send to Google Analytics
    window.gtag("event", metric.name, {
      value: Math.round(
        metric.name === "CLS" ? metric.value * 1000 : metric.value
      ),
      event_label: metric.id,
      non_interaction: true,
    });
  });

  return null;
};
