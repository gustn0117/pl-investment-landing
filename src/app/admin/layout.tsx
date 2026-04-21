export const metadata = {
  title: "PL Investment · Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-ink-950 text-slate-200">{children}</div>;
}
