/**
 * GrainOverlay — fixed, low-opacity SVG noise applied across the whole page.
 * Purely decorative; pointer-events disabled; respects no-print.
 */
export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="grain-overlay"
    />
  );
}
