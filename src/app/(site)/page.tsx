import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import CTA from "@/components/CTA";
import InquiryForm from "@/components/InquiryForm";
import ChartBg from "@/components/ChartBg";
import Sparkline from "@/components/Sparkline";
import OrbitalAccent from "@/components/OrbitalAccent";
import CandlestickField from "@/components/CandlestickField";
import { fetchMonthlyResults } from "@/lib/monthly-results";

export const revalidate = 30;

const HIGHLIGHTS = [
  {
    tag: "ANALYSIS",
    title: "시장 분석",
    desc: "데이터 기반 정밀 리포트",
    body: "기업 펀더멘털과 산업 흐름을 다각도에서 분석하여 가치 있는 투자 아이디어를 제시합니다.",
    icon: <path d="M3 17l6-6 4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    tag: "CONSULTING",
    title: "투자 컨설팅",
    desc: "효율적인 자산 운용 방향 설계",
    body: "포트폴리오 진단부터 맞춤 전략 설계까지, 시장 환경에 최적화된 투자 방향을 제안합니다.",
    icon: <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7l3-7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />,
  },
  {
    tag: "INFORMATION",
    title: "투자 정보",
    desc: "실시간 시장 기회 포착",
    body: "급변하는 시장 속에서 기회를 적시에 포착할 수 있도록 실시간 이슈와 인사이트를 전달합니다.",
    icon: <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />,
  },
];

const VALUES = [
  { n: "01", t: "깊이 있는 시장 분석", d: "시장 구조와 산업의 흐름을 체계적으로 분석하여, 단순한 정보 전달이 아닌 가치 있는 투자 아이디어를 제시합니다." },
  { n: "02", t: "데이터 기반 의사결정", d: "기업의 펀더멘털을 체계적으로 분석하여 현재 주가의 흐름을 정확하게 파악하고, 냉정한 데이터 분석을 기반으로 판단합니다." },
  { n: "03", t: "투자자와 함께 성장", d: "투자자들이 더 나은 투자 판단을 할 수 있도록 돕는 것이 우리의 목표이며, 함께 성장하는 파트너가 되겠습니다." },
  { n: "04", t: "포트폴리오 전략 점검", d: "시장 흐름을 반영해 구조를 점검하고 효율적인 운용 전략을 제안합니다." },
];

const PHILOSOPHY = [
  { n: "01", t: "체계적인 시장 분석", d: "기업의 펀더멘털을 체계적으로 분석하여 현재 주가의 흐름을 정확하게 파악하고, 투자자에게 신뢰할 수 있는 분석을 제공합니다." },
  { n: "02", t: "포트폴리오 전략 점검", d: "시장 흐름을 반영해 효율적인 운용 전략과 수익 가능성을 높이는 투자 방향을 제시합니다." },
  { n: "03", t: "투자자를 위한 정보 서비스", d: "주식투자자들에게 도움이 되는 주식정보를 서비스로 제공하며, 시장의 흐름 속에서 기회를 포착할 수 있도록 지원합니다." },
  { n: "04", t: "함께 성장하는 파트너십", d: "투자자와 함께 성장하는 파트너가 되어, 흔들리지 않는 원칙과 철학으로 더 나은 투자 판단을 할 수 있도록 돕겠습니다." },
];

const SERVICES = [
  {
    tag: "ANALYSIS",
    title: "시장 분석 리포트",
    desc: "시장 구조와 산업의 흐름을 깊이 있게 분석하여 가치 있는 투자 아이디어를 제시합니다. 기업의 펀더멘털, 기술적 분석, 업종별 동향 등 다각도에서 접근합니다.",
    items: ["산업별 심층 분석", "기업 펀더멘털 리뷰", "기술적 차트 분석"],
  },
  {
    tag: "CONSULTING",
    title: "투자 컨설팅",
    desc: "포트폴리오 전반을 점검하고 구조적인 문제 요인을 분석하여 실질적인 수익 창출로 이어질 수 있는 전략적 대안을 제시합니다. 시장 흐름과 투자 환경을 종합적으로 반영하여 보다 효율적인 자산 운용 방향과 투자 전략을 설계합니다.",
    items: ["포트폴리오 진단", "투자 성향 분석", "맞춤 전략 설계"],
  },
  {
    tag: "INFORMATION",
    title: "주식 정보 서비스",
    desc: "주식투자자들에게 도움이 되는 주식정보를 제공하며, 시장의 기회를 포착할 수 있도록 지원합니다. 실시간 이슈 분석과 투자 인사이트를 전달합니다.",
    items: ["실시간 시장 이슈", "투자 인사이트", "종목 모니터링"],
  },
];

const PROCESS = [
  { n: "STEP 01", t: "상담 신청", d: "전화 또는 온라인을 통해 무료 상담을 신청합니다" },
  { n: "STEP 02", t: "현황 분석", d: "현재 투자 현황과 포트폴리오를 정밀 분석합니다" },
  { n: "STEP 03", t: "전략 수립", d: "맞춤형 투자 전략과 포트폴리오를 설계합니다" },
  { n: "STEP 04", t: "실행 & 관리", d: "지속적인 모니터링과 리밸런싱을 진행합니다" },
];

const REVIEWS = [
  { n: "김OO", m: "30대 / 직장인", r: "체계적인 시장 분석 덕분에 투자 판단에 자신감이 생겼습니다. 포트폴리오 점검을 통해 기존 문제점을 정확히 파악할 수 있었어요." },
  { n: "이OO", m: "40대 / 자영업", r: "혼자서는 파악하기 어려웠던 시장 흐름을 깊이 있게 분석해 주셔서 큰 도움이 됐습니다. 덕분에 더 나은 투자 결정을 내릴 수 있었어요." },
  { n: "박OO", m: "30대 / 프리랜서", r: "다른 곳에서 큰 손실을 보고 왔는데, 여기서 기초부터 다시 접근하면서 투자 마인드 자체가 바뀌었습니다. 이제는 흔들리지 않고 판단할 수 있어요." },
  { n: "최OO", m: "50대 / 사업가", r: "데이터 기반의 분석이 정말 체계적이에요. 단계별로 차근차근 설명해 주셔서 시장 구조를 자연스럽게 이해하게 됐습니다." },
];

export default async function Home() {
  const RESULTS = await fetchMonthlyResults();
  return (
    <>
      {/* HERO */}
      <section
        id="home"
        className="relative overflow-hidden bg-ink-950 text-white"
      >
        <ChartBg className="absolute inset-0 h-full w-full opacity-70" />
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="blob bg-gold-500 -top-40 -left-20 w-[32rem] h-[32rem] animate-float" />
        <div className="blob bg-gold-800 top-1/3 -right-32 w-[36rem] h-[36rem]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent pointer-events-none" />

        <div className="pointer-events-none absolute inset-0 overflow-hidden hidden md:block">
          <div
            className="absolute inset-x-0 h-[2px] animate-scan"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(223,189,106,0.35), transparent)",
            }}
          />
        </div>

        <div className="pointer-events-none absolute top-1/4 right-4 md:right-16 w-48 md:w-80 opacity-50 md:opacity-70 hidden sm:block">
          <OrbitalAccent />
        </div>

        <div className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-[55%] flex items-center justify-center opacity-[0.035] md:opacity-[0.06]">
          <Image
            src="/logo/logo-icon.png"
            alt=""
            aria-hidden
            width={900}
            height={900}
            priority
            className="w-[80%] md:w-[85%] max-w-[800px] object-contain"
          />
        </div>

        <div className="relative container-x min-h-screen flex items-center py-32 md:py-40">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/25 bg-gold-500/5 px-4 py-1.5 text-xs font-medium tracking-[0.25em] text-gold-300 backdrop-blur animate-fade-in">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-shimmer" />
              PREMIUM STOCK INVESTMENT
            </div>

            <h1 className="mt-7 animate-fade-up">
              <span className="block font-display text-5xl md:text-7xl font-light leading-[1.05] tracking-tight text-white">
                시장 구조와 산업의 흐름을
              </span>
              <span className="mt-3 block font-display text-5xl md:text-7xl font-medium leading-[1.05] tracking-tight text-gold-gradient">
                깊이 있게 분석합니다
              </span>
            </h1>

            <div className="mt-8 divider-gold">
              <span className="font-display text-sm tracking-[0.4em] text-gold-300">PL INVESTMENT</span>
            </div>

            <p className="mt-8 text-base md:text-xl leading-relaxed text-slate-300/90 max-w-2xl font-light animate-fade-up" style={{ animationDelay: "0.1s" }}>
              가치 있는 투자 아이디어를 제시하는 주식 투자 전문 회사.
              <br className="hidden md:block" />
              PL Investment가 투자자의 올바른 방향을 함께 설계합니다.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <a href="#contact" className="btn-primary">
                무료 상담 신청
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#services" className="btn-ghost">서비스 살펴보기</a>
            </div>

            <div className="mt-16 grid grid-cols-3 max-w-xl gap-x-6 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              {[
                { k: "96%", v: "고객 만족도" },
                { k: "1,200+", v: "누적 컨설팅" },
                { k: "12+", v: "전문 애널리스트" },
              ].map((s) => (
                <div key={s.v} className="relative">
                  <div className="font-display text-3xl md:text-4xl font-medium text-gold-gradient">{s.k}</div>
                  <div className="mt-2 text-xs md:text-sm text-slate-400 tracking-wider">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 inset-x-0 flex justify-center text-gold-300/70 text-xs tracking-[0.4em]">
          <div className="flex flex-col items-center gap-2 animate-shimmer">
            <span>SCROLL</span>
            <span className="block h-8 w-px bg-gradient-to-b from-gold-400/80 to-transparent" />
          </div>
        </div>
      </section>

      {/* LOGO BADGE STRIP */}
      <section className="relative bg-ink-950 border-y border-gold-500/10">
        <div className="absolute inset-0 bg-grid opacity-25" />
        <div className="relative container-x py-10 md:py-12 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          <Image
            src="/logo/logo-gold-transparent.png"
            alt="PL Investment"
            width={520}
            height={320}
            className="h-20 md:h-24 w-auto object-contain"
          />
          <span className="hidden md:block h-16 w-px bg-gradient-to-b from-transparent via-gold-500/40 to-transparent" />
          <div className="text-center md:text-left">
            <div className="font-display text-sm md:text-base tracking-[0.3em] text-gold-300">
              VALUE · TRUST · INSIGHT
            </div>
            <div className="mt-2 text-xs md:text-sm text-slate-400">
              원칙 있는 투자 철학으로 시장의 흐름을 꿰뚫습니다
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE HIGHLIGHTS */}
      <section className="relative py-20 md:py-28 bg-ink-950">
        <div className="absolute inset-0 bg-grid-dense opacity-40 pointer-events-none" />
        <div className="blob bg-gold-700 top-20 -left-40 w-[28rem] h-[28rem]" />
        <div className="relative container-x">
          <SectionHeader
            eyebrow="OUR SERVICES"
            title="가치 있는 투자, 함께 만듭니다"
            description="시장의 흐름을 정확히 읽고, 투자자에게 실질적인 인사이트를 전달합니다."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {HIGHLIGHTS.map((h) => (
              <div key={h.title} className="card-soft group">
                <div className="flex items-center justify-between">
                  <span className="relative grid place-items-center h-12 w-12 rounded-xl bg-gold-500/10 text-gold-300 border border-gold-500/20 group-hover:bg-gradient-to-br group-hover:from-gold-400 group-hover:to-gold-600 group-hover:text-ink-950 group-hover:border-transparent transition">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">{h.icon}</svg>
                  </span>
                  <span className="font-display text-[11px] font-medium tracking-[0.3em] text-gold-400/80">{h.tag}</span>
                </div>
                <h3 className="mt-6 font-display text-2xl font-medium text-white">{h.title}</h3>
                <div className="mt-1 text-sm font-medium text-gold-300">{h.desc}</div>
                <div className="mt-4 h-px bg-gradient-to-r from-gold-400/50 via-gold-500/30 to-transparent" />
                <p className="mt-4 text-sm leading-relaxed text-slate-400">{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="relative py-20 md:py-28 bg-ink-950">
        <div className="absolute inset-0 bg-grid-dense opacity-30" />
        <div className="relative container-x">
          <SectionHeader
            eyebrow="OUR VALUES"
            title="흔들리지 않는 원칙과 철학"
            description="수많은 변수와 노이즈 속에서도 냉정한 데이터 분석과 경험을 기반으로 투자의 본질에 집중합니다."
          />
          <div className="mt-14 grid gap-px bg-white/[0.04] md:grid-cols-2 rounded-3xl overflow-hidden border border-white/10 shadow-dark-panel">
            {VALUES.map((v) => (
              <div key={v.n} className="bg-ink-900/60 backdrop-blur-sm p-8 md:p-10 hover:bg-ink-800/60 transition group">
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-4xl font-light text-gold-400/40 group-hover:text-gold-400 transition">{v.n}</span>
                  <h3 className="text-lg md:text-xl font-medium text-white">{v.t}</h3>
                </div>
                <div className="mt-3 h-px w-12 bg-gradient-to-r from-gold-400 to-transparent" />
                <p className="mt-4 text-sm md:text-base leading-relaxed text-slate-400 font-light">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="relative py-20 md:py-28 bg-ink-950 overflow-hidden">
        <CandlestickField className="absolute inset-0 w-full h-full opacity-40" density={28} />
        <div className="absolute inset-0 bg-grid-dense opacity-25" />
        <div className="relative container-x">
          <SectionHeader
            eyebrow="OUR PHILOSOPHY"
            title="우리의 투자 철학"
            description="PL Investment는 체계적인 분석과 원칙 있는 투자를 통해 투자자의 성공을 지원합니다."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {PHILOSOPHY.map((p) => (
              <div key={p.n} className="card-soft">
                <div className="flex items-start gap-5">
                  <span className="font-display text-4xl font-light text-gold-gradient leading-none">{p.n}</span>
                  <div>
                    <h3 className="text-lg md:text-xl font-medium text-white">{p.t}</h3>
                    <div className="mt-3 h-px w-10 bg-gradient-to-r from-gold-400 to-transparent" />
                    <p className="mt-4 text-sm md:text-base leading-relaxed text-slate-400 font-light">{p.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 md:py-28 bg-ink-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-dense opacity-30" />
        <div className="blob bg-gold-700 top-40 right-0 w-[28rem] h-[28rem]" />
        <div className="relative container-x">
          <SectionHeader
            eyebrow="SERVICE SYSTEM"
            title="투자 서비스"
            description="PL Investment는 깊이 있는 시장 분석과 투자 컨설팅을 통해 투자자의 성공적인 투자를 지원합니다."
          />
          <div className="mt-14 space-y-6">
            {SERVICES.map((s, i) => (
              <div key={s.title} className="grid gap-6 lg:grid-cols-12 items-stretch">
                <div className="lg:col-span-5 relative rounded-3xl bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 text-white p-8 md:p-10 overflow-hidden border border-gold-500/20">
                  <ChartBg className="absolute inset-0 h-full w-full opacity-50" variant="card" />
                  <div className="absolute inset-0 bg-grid opacity-30" />
                  <div className="absolute -right-8 -bottom-8 w-48 opacity-[0.08]">
                    <Image src="/logo/logo-icon.png" alt="" aria-hidden width={300} height={300} className="w-full object-contain" />
                  </div>
                  <div className="relative">
                    <div className="font-display text-xs font-medium tracking-[0.3em] text-gold-400">[{s.tag}]</div>
                    <div className="mt-6 font-display text-7xl md:text-8xl font-light leading-none text-gold-gradient opacity-90">0{i + 1}</div>
                    <h3 className="mt-4 font-display text-2xl md:text-3xl font-medium text-white">{s.title}</h3>
                    <div className="mt-5 h-px w-16 bg-gradient-to-r from-gold-400 to-transparent" />
                  </div>
                </div>
                <div className="lg:col-span-7 rounded-3xl bg-ink-800/50 backdrop-blur-sm border border-white/10 p-8 md:p-10 shadow-dark-panel">
                  <p className="text-base md:text-lg leading-relaxed text-slate-300 font-light">{s.desc}</p>
                  <div className="mt-8 flex flex-wrap gap-2.5">
                    {s.items.map((it) => (
                      <span key={it} className="inline-flex items-center gap-2 rounded-full bg-gold-500/8 border border-gold-500/30 px-4 py-2 text-sm font-medium text-gold-200">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 md:py-28 bg-ink-950 relative">
        <div className="absolute inset-0 bg-grid-dense opacity-30" />
        <div className="relative container-x">
          <SectionHeader
            eyebrow="PROCESS"
            title="투자 서비스 진행 절차"
            description="체계적인 프로세스를 통해 투자자에게 최적의 솔루션을 제공합니다."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-4">
            {PROCESS.map((p, i) => (
              <div key={p.n} className="relative">
                <div className="relative rounded-2xl bg-ink-800/50 backdrop-blur-sm border border-white/10 p-7 h-full shadow-dark-panel hover:border-gold-400/40 hover:shadow-[0_30px_80px_-25px_rgba(223,189,106,0.25)] transition">
                  <div className="font-display text-xs font-medium tracking-[0.25em] text-gold-300">{p.n}</div>
                  <h3 className="mt-3 text-lg font-medium text-white">{p.t}</h3>
                  <div className="mt-3 h-px w-10 bg-gradient-to-r from-gold-400 to-transparent" />
                  <p className="mt-3 text-sm leading-relaxed text-slate-400 font-light">{p.d}</p>
                </div>
                {i < PROCESS.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 h-7 w-7 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-ink-950 items-center justify-center shadow-gold-soft">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section id="results" className="py-20 md:py-28 bg-ink-900 relative">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative container-x">
          <SectionHeader
            eyebrow="MONTHLY REPORT"
            title="월별 수익 내역"
            description="매월 투명하게 공개되는 투자 성과를 확인해 보세요."
          />
          <div className="mt-14 overflow-hidden rounded-3xl border border-white/10 shadow-dark-panel bg-ink-800/40 backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm md:text-base">
                <thead className="bg-gradient-to-r from-ink-800 via-ink-700 to-ink-800 text-white relative">
                  <tr>
                    {["기간", "한달 수익률", "승률", "추이"].map((h) => (
                      <th key={h} className="px-6 py-5 text-left font-medium tracking-wide border-b border-gold-500/20">
                        <span className="text-gold-300 font-display tracking-[0.15em] text-xs mr-2">·</span>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {RESULTS.map((row) => (
                    <tr key={row.period} className="hover:bg-gold-500/5 transition">
                      <td className="px-6 py-5 font-medium text-white font-display">{row.period}</td>
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 px-3.5 py-1.5 text-base font-bold text-rose-300 tabular-nums">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                            <path d="M5 15l7-7 7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {row.return_rate}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-slate-300 font-medium tabular-nums">{row.win_rate}</td>
                      <td className="px-6 py-5">
                        <Sparkline points={row.points} up width={130} height={36} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-slate-500">
            * 투자에는 원금 손실 위험이 있으며, 과거 수익률이 미래 수익을 보장하지 않습니다.
          </p>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-20 md:py-28 bg-ink-950 relative">
        <div className="absolute inset-0 bg-grid-dense opacity-30" />
        <div className="relative container-x">
          <SectionHeader
            eyebrow="REVIEWS"
            title="고객 후기"
            description="실제 서비스를 이용하고 성장한 투자자들의 생생한 이야기입니다."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {REVIEWS.map((r) => (
              <div key={r.n} className="relative rounded-2xl bg-ink-800/50 backdrop-blur-sm border border-white/10 p-8 shadow-dark-panel hover:border-gold-400/40 hover:shadow-[0_30px_80px_-25px_rgba(223,189,106,0.25)] transition">
                <svg width="40" height="40" viewBox="0 0 32 32" className="absolute -top-3 left-6 text-gold-400" fill="currentColor">
                  <path d="M10 8c-3.3 0-6 2.7-6 6v8h8v-8H6c0-2.2 1.8-4 4-4V8zm12 0c-3.3 0-6 2.7-6 6v8h8v-8h-6c0-2.2 1.8-4 4-4V8z" />
                </svg>
                <div className="flex items-center gap-1 text-gold-400 mt-2">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7l3-7z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-5 text-base leading-relaxed text-slate-200 font-light">
                  {r.r}
                </p>
                <div className="mt-6 flex items-center gap-3 pt-5 border-t border-white/5">
                  <span className="grid place-items-center h-10 w-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-ink-950 font-medium text-sm shadow-gold-soft">{r.n[0]}</span>
                  <div>
                    <div className="text-sm font-medium text-white">{r.n}</div>
                    <div className="text-xs text-slate-400">{r.m}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-xs text-slate-500">
            * 위 내용은 실제 고객 후기를 기반으로 작성되었습니다.
          </p>
        </div>
      </section>

      {/* CTA SPLIT */}
      <section className="bg-ink-900 relative">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative container-x py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <div className="eyebrow">PARTNER</div>
              <h2 className="h-section mt-4 text-white">
                시장의 변화 속에서도<br />
                <span className="text-gold-gradient">흔들리지 않는 파트너</span>
              </h2>
              <p className="mt-6 text-base md:text-lg leading-relaxed text-slate-300 font-light">
                금융 시장은 끊임없이 변화하며 그 속에서 기회는 언제나 새로운 형태로
                나타납니다. PL Investment가 올바른 방향으로 나아갈 수 있도록 돕겠습니다.
              </p>
            </div>
            <div className="relative rounded-3xl bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 p-8 md:p-10 text-white overflow-hidden border border-gold-500/20 shadow-2xl">
              <ChartBg className="absolute inset-0 h-full w-full opacity-50" variant="card" />
              <div className="absolute inset-0 bg-grid opacity-30" />
              <div className="absolute -top-10 -right-10 w-56 opacity-[0.08]">
                <Image src="/logo/logo-icon.png" alt="" aria-hidden width={400} height={400} className="w-full object-contain" />
              </div>
              <div className="relative">
                <ul className="space-y-4">
                  {["효율적인 자산 운용 설계", "리스크 관리 및 안정적 수익 추구", "시장 구조와 산업 흐름 분석"].map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <span className="mt-1 grid place-items-center h-6 w-6 rounded-full bg-gold-500/15 text-gold-300 shrink-0 border border-gold-500/30">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-base font-medium text-slate-100">{t}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 px-7 py-3.5 text-sm font-semibold text-ink-950 shadow-gold-glow hover:shadow-[0_0_40px_rgba(223,189,106,0.6)] transition">
                  무료 상담 신청
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INQUIRY FORM */}
      <section id="contact" className="py-20 md:py-28 bg-ink-900 relative">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative container-x">
          <SectionHeader
            eyebrow="INQUIRY"
            title="문의하기"
            description="아래 양식을 통해 문의해 주시면 빠르게 답변 드리겠습니다."
          />
          <div className="mt-14 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4 relative rounded-3xl bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 text-white p-8 md:p-10 overflow-hidden border border-gold-500/25 shadow-xl">
              <div className="absolute inset-0 bg-grid opacity-30" />
              <div className="absolute -top-6 -right-6 w-48 opacity-[0.08]">
                <Image src="/logo/logo-icon.png" alt="" aria-hidden width={300} height={300} className="w-full object-contain" />
              </div>
              <div className="relative">
                <div className="eyebrow">CONTACT INFO</div>
                <h3 className="mt-4 font-display text-2xl font-medium text-white">언제든 문의해 주세요</h3>
                <div className="mt-5 h-px w-16 bg-gradient-to-r from-gold-400 to-transparent" />
                <div className="mt-8 space-y-6">
                  <div>
                    <div className="text-xs font-medium text-gold-400 tracking-[0.25em]">TEL</div>
                    <a href="tel:0269533081" className="mt-1 inline-flex items-center gap-2 text-2xl font-medium hover:text-gold-300 transition">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gold-400">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      02-6953-3081
                    </a>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gold-400 tracking-[0.25em]">HOURS</div>
                    <div className="mt-1 text-base font-medium text-slate-100">평일 09:00 ~ 18:00</div>
                    <div className="text-sm text-slate-400">(주말 및 공휴일 휴무)</div>
                  </div>
                </div>
                <div className="mt-10 pt-6 border-t border-gold-500/15 text-xs leading-relaxed text-slate-500">
                  당해 업체는 금융투자업자가 아닌 유사투자자문업자로 개별적인 투자 상담과
                  자금 운용이 불가능합니다.
                </div>
              </div>
            </div>
            <div className="lg:col-span-8">
              <InquiryForm />
            </div>
          </div>
        </div>
      </section>

      <CTA
        title="지금 무료 상담을 신청해 보세요"
        subtitle="전문 컨설턴트가 투자 방향을 함께 설계해 드립니다."
        primary={{ label: "무료 상담 신청", href: "#contact" }}
        secondary={{ label: "02-6953-3081", href: "tel:0269533081" }}
      />
    </>
  );
}
