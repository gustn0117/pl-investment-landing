import type { Metadata } from "next";
import { Noto_Sans_KR, Space_Grotesk } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothAnchors from "@/components/SmoothAnchors";
import "./globals.css";

const noto = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-noto",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PL Investment | 주식 투자 전문 컨설팅",
  description:
    "시장 구조와 산업의 흐름을 깊이 있게 분석하여 가치 있는 투자 아이디어를 제시하는 주식 투자 전문 회사 PL Investment.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${noto.variable} ${grotesk.variable}`}>
      <body className="font-sans antialiased text-slate-200 bg-ink-950">
        <SmoothAnchors />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
