type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
};

export default function SectionHeader({ eyebrow, title, description, align = "center" }: Props) {
  const wrapAlign = align === "center" ? "text-center mx-auto items-center" : "text-left items-start";
  return (
    <div className={`${wrapAlign} flex flex-col max-w-3xl`}>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2 className="h-section mt-4 text-white">{title}</h2>
      <div className="mt-5 h-px w-20 bg-gradient-to-r from-gold-400 via-gold-500 to-transparent" />
      {description && (
        <p className="mt-5 text-base md:text-lg leading-relaxed text-slate-400">
          {description}
        </p>
      )}
    </div>
  );
}
