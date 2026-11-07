// Logo R complet (vectoriel), toujours posé sur fond sombre comme le demande la charte.
export function Logo({ size = 40 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- SVG statique, pas besoin d'optimisation
    <img
      src="/logo.svg"
      alt=""
      width={size}
      height={Math.round((size * 227) / 248)}
      className="logo-mark"
    />
  );
}
