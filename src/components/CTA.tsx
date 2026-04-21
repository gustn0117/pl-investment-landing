import Image from "next/image";
import ChartBg from "./ChartBg";
import OrbitalAccent from "./OrbitalAccent";

type Props = {
  title: React.ReactNode;
  subtitle?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export default function CTA({ title, subtitle, primary, secondary }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-ink-900 via-ink-800 to-ink-900 text-white">
      <ChartBg className="absolute inset-0 h-full w-full opacity-40" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="blob bg-gold-500 -top-20 -left-10 w-96 h-96" />
      <div className="blob bg-gold-800 -bottom-24 -right-10 w-96 h-96" />
      <div className="pointer-events-none absolute top-1/2 right-6 md:right-16 -translate-y-1/2 w-40 md:w-72 opacity-40 md:opacity-60 hidden sm:block">
        <OrbitalAccent />
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.05]">
        <Image
          src="/logo/logo-icon.png"
          alt=""
          aria-hidden
          width={700}
          height={700}
          className="w-[60%] max-w-[520px] object-contain"
        />
      </div>
      <div className="relative container-x py-20 md:py-28 text-center">
        <div className="mx-auto divider-gold">
          <span className="font-display text-xs tracking-[0.4em] text-gold-300">PL INVESTMENT</span>
        </div>
        <h2 className="h-section mt-6 text-white max-w-3xl mx-auto">{title}</h2>
        {subtitle && (
          <p className="mt-5 text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        {(primary || secondary) && (
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            {primary && (
              <a href={primary.href} className="btn-primary">
                {primary.label}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            )}
            {secondary && (
              <a href={secondary.href} className="btn-ghost">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0122 16.92z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {secondary.label}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
