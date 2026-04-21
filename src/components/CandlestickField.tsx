type Props = {
  className?: string;
  density?: number;
};

// Decorative candlestick pattern used as subtle section background.
export default function CandlestickField({ className = "", density = 30 }: Props) {
  const items = Array.from({ length: density }).map((_, i) => {
    const x = (i * 57) % 1200;
    const y = 40 + ((i * 73) % 520);
    const bodyH = 12 + ((i * 7) % 42);
    const wick = 8 + ((i * 5) % 20);
    const up = (i * 3) % 4 !== 0;
    return { i, x, y, bodyH, wick, up };
  });

  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none ${className}`}
    >
      {items.map((c) => (
        <g key={c.i} opacity="0.45">
          <line
            x1={c.x}
            y1={c.y - c.bodyH / 2 - c.wick}
            x2={c.x}
            y2={c.y + c.bodyH / 2 + c.wick}
            stroke={c.up ? "rgba(223,189,106,0.5)" : "rgba(133,96,44,0.45)"}
            strokeWidth="1"
          />
          <rect
            x={c.x - 3}
            y={c.y - c.bodyH / 2}
            width="6"
            height={c.bodyH}
            fill={c.up ? "rgba(223,189,106,0.35)" : "rgba(133,96,44,0.3)"}
            rx="0.8"
          />
        </g>
      ))}
    </svg>
  );
}
