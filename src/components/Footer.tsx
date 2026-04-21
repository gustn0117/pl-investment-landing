import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-900 text-slate-300">
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(223,189,106,0.5) 50%, transparent 100%)",
        }}
      />
      <div className="blob bg-gold-600 -top-20 -left-20 w-96 h-96" />
      <div className="blob bg-gold-800 -bottom-24 -right-10 w-[28rem] h-[28rem]" />

      <div className="relative container-x py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-start gap-4">
              <span className="relative grid place-items-center h-14 w-14 rounded-xl border border-gold-500/30 bg-ink-800/70 overflow-hidden">
                <Image
                  src="/logo/logo-icon.png"
                  alt="PL Investment"
                  width={96}
                  height={96}
                  className="h-11 w-11 object-contain"
                />
              </span>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-[0.18em] text-white">
                  PL INVESTMENT
                </span>
                <span className="mt-1 text-[11px] font-medium tracking-[0.3em] text-gold-400">
                  피엘 인베스트먼트
                </span>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-slate-400 max-w-md">
              시장의 흐름을 분석하고 투자자들이 올바른 방향으로 나아갈 수 있도록 돕는
              주식 투자 전문 회사입니다.
            </p>
            <div className="mt-6 hairline-gold max-w-xs" />
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/5 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-gold-300">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-shimmer" />
              PREMIUM INVESTMENT PARTNER
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-sm font-bold text-white tracking-wider">바로가기</h4>
            <div className="mt-3 h-px w-8 bg-gradient-to-r from-gold-500 to-transparent" />
            <ul className="mt-5 space-y-3 text-sm">
              <li><a href="#about" className="hover:text-gold-300 transition">회사 소개</a></li>
              <li><a href="#services" className="hover:text-gold-300 transition">서비스 안내</a></li>
              <li><a href="#results" className="hover:text-gold-300 transition">수익내역</a></li>
              <li><a href="#contact" className="hover:text-gold-300 transition">고객센터</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-sm font-bold text-white tracking-wider">연락처</h4>
            <div className="mt-3 h-px w-8 bg-gradient-to-r from-gold-500 to-transparent" />
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href="tel:0269533081"
                  className="inline-flex items-center gap-2 text-2xl font-bold text-white hover:text-gold-300 transition"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gold-400">
                    <path
                      d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0122 16.92z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  02-6953-3081
                </a>
              </li>
              <li className="text-slate-400">평일 09:00 ~ 18:00</li>
              <li className="text-slate-500 text-xs">(토, 일 공휴일 및 휴장일 휴무)</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-gold-500/15 space-y-3 text-xs leading-relaxed text-slate-500">
          <p>
            당해 업체는 금융투자업자가 아닌 유사투자자문업자로 개별적인 투자 상담과 자금
            운용이 불가능합니다.
          </p>
          <p>
            투자 결과에 따라 투자 원금의 손실이 발생할 수 있으며, 그 손실은 투자자에게
            귀속됩니다.
          </p>
        </div>

        <div className="mt-8 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-xs text-slate-500">
          <div>
            법인명: 주식회사 피엘인베스트먼트 <span className="mx-2 text-slate-700">|</span>
            사업자등록번호: 731-88-03531
          </div>
          <div>© 2026 PL Investment. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
