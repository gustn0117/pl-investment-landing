import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothAnchors from "@/components/SmoothAnchors";
import StickyBottomCTA from "@/components/StickyBottomCTA";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pb-[340px] sm:pb-[210px] md:pb-[220px]">
      <SmoothAnchors />
      <Header />
      <main>{children}</main>
      <Footer />
      <StickyBottomCTA />
    </div>
  );
}
