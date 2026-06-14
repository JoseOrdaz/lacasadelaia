interface SectionTitleProps {
  label?: string
  title: string
  description?: string
  centered?: boolean
}

export default function SectionTitle({ label, title, description, centered = false }: SectionTitleProps) {
  return (
    <div className={`mb-10 md:mb-14 ${centered ? 'text-center' : ''}`}>
      {label && (
        <span className="inline-block text-xs font-body font-semibold tracking-widest uppercase text-mist border border-faded px-3 py-1 rounded-sm mb-4">
          {label}
        </span>
      )}
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-carbon leading-tight mb-4">
        {title}
      </h2>
      {description && (
        <p className="font-body text-base md:text-lg text-ink/70 max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
