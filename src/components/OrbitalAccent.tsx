type Props = {
  className?: string;
};

// 3D-feeling wireframe orbital sphere with gold latitude/longitude lines,
// rotating slowly via CSS. Pure SVG, no JS animation.
export default function OrbitalAccent({ className = "" }: Props) {
  return (
    <div className={`relative ${className}`} aria-hidden>
      <svg viewBox="-100 -100 200 200" className="w-full h-full">
        <defs>
          <radialGradient id="orbGlow" cx="0.35" cy="0.35">
            <stop offset="0%" stopColor="rgba(236,214,156,0.35)" />
            <stop offset="55%" stopColor="rgba(191,145,64,0.12)" />
            <stop offset="100%" stopColor="rgba(133,96,44,0)" />
          </radialGradient>
          <linearGradient id="orbRing" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#dfbd6a" stopOpacity="0" />
            <stop offset="50%" stopColor="#dfbd6a" stopOpacity="1" />
            <stop offset="100%" stopColor="#dfbd6a" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* core sphere glow */}
        <circle cx="0" cy="0" r="78" fill="url(#orbGlow)" />
        <circle cx="0" cy="0" r="78" fill="none" stroke="rgba(223,189,106,0.35)" strokeWidth="0.7" />

        {/* latitude rings (static) */}
        <g
          stroke="rgba(223,189,106,0.28)"
          strokeWidth="0.7"
          fill="none"
        >
          <ellipse cx="0" cy="0" rx="78" ry="25" />
          <ellipse cx="0" cy="0" rx="78" ry="52" />
          <ellipse cx="0" cy="0" rx="78" ry="70" />
        </g>

        {/* longitude rings that rotate */}
        <g className="animate-slow-spin" style={{ transformOrigin: "0px 0px" }}>
          <g stroke="rgba(223,189,106,0.4)" strokeWidth="0.8" fill="none">
            <ellipse cx="0" cy="0" rx="30" ry="78" />
            <ellipse cx="0" cy="0" rx="58" ry="78" />
            <ellipse cx="0" cy="0" rx="78" ry="78" stroke="url(#orbRing)" strokeWidth="1.2" />
          </g>
          {/* data satellites */}
          <g fill="#ecd69c">
            <circle cx="78" cy="0" r="2.5">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="-78" cy="0" r="1.8">
              <animate attributeName="opacity" values="1;0.4;1" dur="3s" repeatCount="indefinite" />
            </circle>
          </g>
        </g>

        {/* outer orbit ring with traveling dot */}
        <g className="animate-slow-spin" style={{ transformOrigin: "0px 0px", animationDuration: "18s" }}>
          <ellipse
            cx="0"
            cy="0"
            rx="92"
            ry="92"
            fill="none"
            stroke="rgba(223,189,106,0.2)"
            strokeWidth="0.8"
            strokeDasharray="1 3"
          />
          <circle cx="92" cy="0" r="3" fill="#ecd69c">
            <animate attributeName="r" values="2;4.5;2" dur="1.6s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* center node */}
        <circle cx="0" cy="0" r="5" fill="#dfbd6a" />
        <circle cx="0" cy="0" r="2" fill="#fffbe6" />
      </svg>
    </div>
  );
}
