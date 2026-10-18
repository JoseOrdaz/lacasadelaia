'use client'

import { useState } from 'react'
import Workflow from './Workflow'

type Example = {
  title: string
  description: string
  nodes: string[]
  benefit: string
}

export default function InteractiveExamples({ examples }: { examples: Example[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = examples[activeIndex]

  return (
    <div className="interactive-examples">
      <div className="interactive-example-nav" aria-label="Selecciona un ejemplo">
        {examples.map((example, index) => (
          <button
            key={example.title}
            type="button"
            aria-pressed={activeIndex === index}
            aria-controls="interactive-example-panel"
            onClick={() => setActiveIndex(index)}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{example.title}</strong>
          </button>
        ))}
      </div>
      <div id="interactive-example-panel" className="interactive-example-panel" aria-live="polite">
        <div className="interactive-example-copy">
          <p className="eyebrow">EJEMPLO {String(activeIndex + 1).padStart(2, '0')}</p>
          <h3>{active.title}</h3>
          <p>{active.description}</p>
          <p className="example-benefit">{active.benefit}</p>
        </div>
        <div className="interactive-example-flow">
          <Workflow nodes={active.nodes} />
        </div>
      </div>
    </div>
  )
}
