export default function Workflow({ nodes }: { nodes: string[] }) {
  return <ol className="workflow" aria-label="Pasos de la automatización">{nodes.map((node, index) => <li key={`${index}-${node}`}><span className="workflow-number">{String(index + 1).padStart(2, '0')}</span><span>{node}</span></li>)}</ol>
}
