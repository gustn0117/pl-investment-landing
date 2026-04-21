import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothAnchors from "@/components/SmoothAnchors";
import StickyBottomCTA from "@/components/StickyBottomCTA";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pb-[300px] sm:pb-[200px] md:pb-[210px]">
      <SmoothAnchors />
      <Header />
      <main>{children}</main>
      <Footer />
      <StickyBottomCTA />
    </div>
  );
}
