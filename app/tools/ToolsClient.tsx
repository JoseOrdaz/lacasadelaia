'use client'

import { useState } from 'react'
import ToolCard from '@/components/ToolCard'
import CategoryPill from '@/components/CategoryPill'
import { tools, categories } from '@/data/tools'
import type { ToolCategory } from '@/types'

const ALL = 'Todas'

export default function ToolsClient() {
  const [active, setActive] = useState<string>(ALL)

  const filtered =
    active === ALL ? tools : tools.filter((t) => t.category === active)

  return (
    <div className="container-main section">
      {/* Filters */}
      <div className="mb-10 flex flex-wrap gap-2 items-center">
        <CategoryPill
          as="button"
          category={ALL}
          active={active === ALL}
          onClick={() => setActive(ALL)}
        />
        {categories.map((cat) => (
          <CategoryPill
            key={cat}
            as="button"
            category={cat}
            active={active === cat}
            onClick={() => setActive(cat as ToolCategory)}
          />
        ))}
      </div>

      {/* Count */}
      <p className="font-body text-xs text-mist uppercase tracking-widest mb-6">
        {filtered.length} herramienta{filtered.length !== 1 ? 's' : ''}{' '}
        {active !== ALL ? `· ${active}` : ''}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  )
}
