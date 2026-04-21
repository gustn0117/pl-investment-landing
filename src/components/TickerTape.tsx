const TICKERS = [
  { s: "KOSPI", p: "2,687.44", c: "+1.23%", up: true },
  { s: "KOSDAQ", p: "875.12", c: "+0.87%", up: true },
  { s: "S&P 500", p: "5,987.22", c: "-0.45%", up: false },
  { s: "NASDAQ", p: "21,452.10", c: "+1.12%", up: true },
  { s: "DOW", p: "44,892.33", c: "+0.62%", up: true },
  { s: "삼성전자", p: "78,900", c: "+2.34%", up: true },
  { s: "SK하이닉스", p: "214,500", c: "+1.85%", up: true },
  { s: "NVIDIA", p: "$482.15", c: "+3.47%", up: true },
  { s: "TSLA", p: "$287.22", c: "-1.08%", up: false },
  { s: "AAPL", p: "$228.10", c: "+0.72%", up: true },
  { s: "GOLD", p: "$2,687.50", c: "+0.45%", up: true },
  { s: "USD/KRW", p: "1,384.20", c: "-0.18%", up: false },
];

export default function TickerTape() {
  const loop = [...TICKERS, ...TICKERS, ...TICKERS];
  return (
    <div
      className="relative overflow-hidden border-y border-gold-500/20 bg-ink-900/95 backdrop-blur py-3"
      aria-label="실시간 시세 (데모)"
    >
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink-900 to-transparent z-10 pointer-events-none" />

      <div className="flex w-max gap-10 animate-marquee will-change-transform">
        {loop.map((t, i) => (
          <div
            key={i}
            className="flex items-center gap-3 text-[13px] md:text-sm whitespace-nowrap"
          >
            <span className="font-serif tracking-[0.2em] text-gold-300 font-bold">
              {t.s}
            </span>
            <span className="text-slate-100 font-medium tabular-nums">{t.p}</span>
            <span
              className={`font-semibold tabular-nums inline-flex items-center gap-0.5 ${
                t.up ? "text-rose-400" : "text-sky-400"
              }`}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                {t.up ? (
                  <path
                    d="M12 4l8 10H4z"
                    fill="currentColor"
                  />
                ) : (
                  <path
                    d="M12 20L4 10h16z"
                    fill="currentColor"
                  />
                )}
              </svg>
              {t.c}
            </span>
            <span className="text-gold-500/30">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}
