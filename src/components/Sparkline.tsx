type Props = {
  points: number[];
  width?: number;
  height?: number;
  up?: boolean;
  className?: string;
};

export default function Sparkline({
  points,
  width = 96,
  height = 28,
  up = true,
  className = "",
}: Props) {
  if (points.length < 2) return null;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const step = width / (points.length - 1);

  const coords = points.map((p, i) => [i * step, height - ((p - min) / range) * (height - 4) - 2]);
  const lineD = coords
    .map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(" ");
  const areaD = `${lineD} L ${width} ${height} L 0 ${height} Z`;

  const stroke = up ? "#e11d48" : "#0284c7";
  const fill = up ? "rgba(225,29,72,0.14)" : "rgba(2,132,199,0.14)";
  const lastX = coords[coords.length - 1][0];
  const lastY = coords[coords.length - 1][1];

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={className}
    >
      <path d={areaD} fill={fill} />
      <path d={lineD} fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lastX} cy={lastY} r="2.2" fill={stroke} />
    </svg>
  );
}
