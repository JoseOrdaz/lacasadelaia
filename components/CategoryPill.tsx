'use client'

interface CategoryPillProps {
  category: string
  active?: boolean
  onClick?: () => void
  as?: 'button' | 'span'
}

export default function CategoryPill({ category, active = false, onClick, as: Tag = 'span' }: CategoryPillProps) {
  const base = 'inline-block text-xs font-body font-semibold tracking-wide px-3 py-1 rounded-sm border transition-all duration-150'
  const activeStyles = 'bg-carbon text-cream border-carbon'
  const inactiveStyles = 'bg-transparent text-ink border-faded hover:border-carbon hover:text-carbon'

  if (Tag === 'button') {
    return (
      <button
        onClick={onClick}
        className={`${base} ${active ? activeStyles : inactiveStyles} cursor-pointer`}
      >
        {category}
      </button>
    )
  }

  return (
    <span className={`${base} ${active ? activeStyles : inactiveStyles}`}>
      {category}
    </span>
  )
}
