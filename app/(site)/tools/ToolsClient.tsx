'use client'

import { useState } from 'react'
import ToolCard from '@/components/ToolCard'
import CategoryPill from '@/components/CategoryPill'
import type { Tool, ToolCategory } from '@/types'

const ALL = 'Todas'

export default function ToolsClient({ tools, categories }: { tools: Tool[]; categories: string[] }) {
  const [active, setActive] = useState<string>(ALL)
  const [query, setQuery] = useState('')

  const normalizedQuery = query.trim().toLowerCase()
  const filtered = tools.filter((tool) => {
    const matchesCategory = active === ALL || tool.category === active
    const matchesQuery = !normalizedQuery || [tool.name, tool.description, tool.useCase, tool.category]
      .some((value) => value.toLowerCase().includes(normalizedQuery))
    return matchesCategory && matchesQuery
  })

  return (
    <div className="container-main section">
      {/* Filters */}
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <label className="relative block w-full md:max-w-sm">
          <span className="sr-only">Buscar herramientas</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por nombre o uso…"
            className="w-full border-b border-carbon bg-transparent px-0 py-3 pr-8 font-body text-sm text-carbon placeholder:text-mist focus:border-olive focus:outline-none"
          />
          <span aria-hidden="true" className="pointer-events-none absolute right-0 top-3 text-mist">⌕</span>
        </label>
        <p className="font-body text-xs uppercase tracking-widest text-mist">Curado para trabajar mejor</p>
      </div>

      <div className="mb-10 flex flex-wrap items-center gap-2">
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
        {active !== ALL ? `· ${active}` : ''}{query ? ` · “${query}”` : ''}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="border border-dashed border-faded py-16 text-center">
          <p className="font-display text-2xl text-carbon">No hemos encontrado esa herramienta.</p>
          <p className="mt-2 font-body text-sm text-mist">Prueba con otra palabra o vuelve a mostrar todas.</p>
        </div>
      )}
    </div>
  )
}
