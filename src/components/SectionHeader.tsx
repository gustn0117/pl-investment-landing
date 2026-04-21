type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  invert?: boolean;
};

export default function SectionHeader({ eyebrow, title, description, align = "center", invert = false }: Props) {
  const wrapAlign = align === "center" ? "text-center mx-auto items-center" : "text-left items-start";
  return (
    <div className={`${wrapAlign} flex flex-col max-w-3xl`}>
      {eyebrow && (
        <div className={`eyebrow ${invert ? "!text-gold-300" : ""}`}>{eyebrow}</div>
      )}
      <h2 className={`h-section mt-4 font-serif ${invert ? "text-white" : "text-ink-900"}`}>{title}</h2>
      <div className={`mt-5 h-px w-20 ${invert ? "bg-gradient-to-r from-gold-300 via-gold-400 to-transparent" : "bg-gradient-to-r from-gold-500 via-gold-400 to-transparent"}`} />
      {description && (
        <p className={`mt-5 text-base md:text-lg leading-relaxed ${invert ? "text-slate-300" : "text-slate-600"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
