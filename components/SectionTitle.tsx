// Titre de section façon CV : « Moi. » avec le point en Braise et un filet dessous.
export function SectionTitle({ children, aside }: { children: string; aside?: string }) {
  return (
    <div className="section-title">
      <h2>
        {children}
        <span className="dot">.</span>
      </h2>
      {aside && <span className="mono muted">{aside}</span>}
    </div>
  );
}
