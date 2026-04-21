type Props = {
  className?: string;
  variant?: "hero" | "card";
};

export default function ChartBg({ className = "", variant = "hero" }: Props) {
  const isHero = variant === "hero";
  const areaOpacity = isHero ? 0.35 : 0.25;
  const lineOpacity = isHero ? 0.9 : 0.7;

  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none ${className}`}
    >
      <defs>
        <linearGradient id="cbArea" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#dfbd6a" stopOpacity={areaOpacity} />
          <stop offset="60%" stopColor="#bf9140" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#bf9140" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="cbLine" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#bf9140" stopOpacity="0.3" />
          <stop offset="40%" stopColor="#dfbd6a" stopOpacity={lineOpacity} />
          <stop offset="100%" stopColor="#f5ead0" stopOpacity="1" />
        </linearGradient>
        <pattern id="cbGrid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path
            d="M 60 0 L 0 0 0 60"
            fill="none"
            stroke="rgba(223,189,106,0.08)"
            strokeWidth="1"
          />
        </pattern>
        <filter id="cbGlow">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="1200" height="600" fill="url(#cbGrid)" />

      {/* horizontal guidelines */}
      {[120, 240, 360, 480].map((y) => (
        <line
          key={y}
          x1="0"
          x2="1200"
          y1={y}
          y2={y}
          stroke="rgba(223,189,106,0.06)"
          strokeDasharray="2 6"
        />
      ))}

      {/* area + line chart */}
      <path
        d="M 0 520 Q 80 500, 140 470 T 260 440 T 360 420 T 480 380 T 580 350 T 700 320 T 820 260 T 940 230 T 1060 190 L 1200 140 L 1200 600 L 0 600 Z"
        fill="url(#cbArea)"
      />
      <path
        d="M 0 520 Q 80 500, 140 470 T 260 440 T 360 420 T 480 380 T 580 350 T 700 320 T 820 260 T 940 230 T 1060 190 L 1200 140"
        fill="none"
        stroke="url(#cbLine)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#cbGlow)"
      />

      {/* secondary comparison line */}
      <path
        d="M 0 540 L 120 520 L 240 510 L 360 500 L 480 470 L 600 460 L 720 430 L 840 410 L 960 370 L 1080 340 L 1200 310"
        fill="none"
        stroke="rgba(236,214,156,0.35)"
        strokeWidth="1.4"
        strokeDasharray="5 4"
      />

      {/* candlesticks */}
      {Array.from({ length: 14 }).map((_, i) => {
        const x = 60 + i * 82;
        const baseY = 420 - i * 14;
        const wickLen = 22 + (i % 4) * 6;
        const bodyH = 18 + (i % 3) * 10;
        const up = i % 3 !== 0;
        return (
          <g key={i} opacity="0.55">
            <line
              x1={x}
              y1={baseY - wickLen}
              x2={x}
              y2={baseY + wickLen}
              stroke={up ? "#ecd69c" : "#85602c"}
              strokeWidth="1"
            />
            <rect
              x={x - 5}
              y={baseY - bodyH / 2}
              width="10"
              height={bodyH}
              fill={up ? "#dfbd6a" : "#85602c"}
              opacity="0.85"
              rx="1"
            />
          </g>
        );
      })}

      {/* pulsing end dot */}
      <circle cx="1060" cy="190" r="5" fill="#ecd69c" filter="url(#cbGlow)">
        <animate attributeName="r" values="3;9;3" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.3;1" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="1060" cy="190" r="2.5" fill="#fff9e8" />
    </svg>
  );
}
