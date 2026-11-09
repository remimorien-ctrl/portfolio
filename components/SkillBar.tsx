const SEGMENTS = 12;

// Jauge segmentée du CV : les segments passent du Soleil à la Braise.
export function SkillBar({ name, level }: { name: string; level: number }) {
  return (
    <div className="skill">
      <span className="skill-name">{name}</span>
      <div
        className="skill-bar"
        role="meter"
        aria-label={name}
        aria-valuemin={0}
        aria-valuemax={SEGMENTS}
        aria-valuenow={level}
      >
        {Array.from({ length: SEGMENTS }, (_, i) => (
          <span key={i} className={i < level ? `on seg-${Math.floor((i / SEGMENTS) * 4)}` : undefined} />
        ))}
      </div>
    </div>
  );
}
