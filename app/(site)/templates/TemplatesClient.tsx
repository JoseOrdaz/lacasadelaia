'use client'

import { useState } from 'react'
import TemplateCard from '@/components/TemplateCard'
import NewsletterForm from '@/components/NewsletterForm'
import LeadForm from '@/components/LeadForm'
import type { Template } from '@/types'

export default function TemplatesClient({ templates }: { templates: Template[] }) {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)

  const handleDownload = (template: Template) => setSelectedTemplate(template)
  const closeModal = () => setSelectedTemplate(null)

  return (
    <>
      <div className="container-main section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              expanded
              onDownload={handleDownload}
            />
          ))}
        </div>

        {/* Value note */}
        <div className="mt-14 bg-parchment border border-faded rounded-sm p-6 md:p-8 flex flex-col sm:flex-row gap-6 items-start">
          <span className="text-4xl opacity-30">◈</span>
          <div>
            <h3 className="font-display text-xl text-carbon mb-2">¿Quieres más recursos?</h3>
            <p className="font-body text-sm text-ink/70 leading-relaxed mb-4 max-w-md">
              Cada semana enviamos una idea práctica de IA a los suscriptores. Nuevas plantillas,
              flujos de trabajo y herramientas antes que nadie.
            </p>
            <NewsletterForm variant="inline" />
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedTemplate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon/60 backdrop-blur-sm animate-fade-in"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="bg-cream border border-carbon rounded-sm shadow-card-hover w-full max-w-md animate-slide-up">
            <div className="p-6 border-b border-faded">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-body text-xs font-semibold uppercase tracking-widest text-mist mb-1">
                    Descargando
                  </p>
                  <h3 className="font-display text-xl text-carbon leading-tight">
                    {selectedTemplate.title}
                  </h3>
                </div>
                <button
                  onClick={closeModal}
                  aria-label="Cerrar"
                  className="text-mist hover:text-carbon transition-colors text-xl leading-none mt-1"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6">
              <p className="font-body text-sm text-ink/70 leading-relaxed mb-6">
                Déjame tu email y te doy acceso a la plantilla. Sin spam, solo recursos prácticos.
              </p>
              <LeadForm
                key={selectedTemplate.id}
                source="template"
                detail={`Plantilla: ${selectedTemplate.title}`}
                button="Recibir plantilla →"
                success={selectedTemplate.downloadUrl
                  ? <p><strong>¡Listo!</strong> <a href={selectedTemplate.downloadUrl} target="_blank" rel="noopener noreferrer">Descargar «{selectedTemplate.title}» →</a></p>
                  : <p><strong>¡Listo!</strong> Te envío la plantilla a tu email en cuanto la revise.</p>}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
