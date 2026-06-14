'use client'

import { useState } from 'react'
import TemplateCard from '@/components/TemplateCard'
import NewsletterForm from '@/components/NewsletterForm'
import { templates } from '@/data/templates'
import type { Template } from '@/types'

export default function TemplatesClient() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [modalEmail, setModalEmail] = useState('')
  const [modalStatus, setModalStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleDownload = (template: Template) => {
    setSelectedTemplate(template)
    setModalStatus('idle')
    setModalEmail('')
  }

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!modalEmail) return
    setModalStatus('loading')
    console.log('Template download request:', { email: modalEmail, template: selectedTemplate?.id })
    await new Promise((r) => setTimeout(r, 800))
    setModalStatus('success')
  }

  const closeModal = () => {
    setSelectedTemplate(null)
    setModalStatus('idle')
    setModalEmail('')
  }

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
              {modalStatus === 'success' ? (
                <div className="text-center py-4 animate-fade-in">
                  <div className="w-14 h-14 bg-lime-light border border-lime rounded-sm flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✓</span>
                  </div>
                  <p className="font-display text-xl text-carbon mb-2">¡Listo!</p>
                  <p className="font-body text-sm text-ink/70 mb-6">
                    Te enviamos la plantilla al email en breve.
                  </p>
                  <button
                    onClick={closeModal}
                    className="font-body text-sm font-semibold text-carbon border border-carbon rounded-sm px-6 py-2.5 hover:bg-carbon hover:text-cream transition-colors duration-150"
                  >
                    Cerrar
                  </button>
                </div>
              ) : (
                <>
                  <p className="font-body text-sm text-ink/70 leading-relaxed mb-6">
                    Déjanos tu email y te enviamos la plantilla al instante.
                    Sin spam, solo recursos prácticos.
                  </p>
                  <form onSubmit={handleModalSubmit} className="space-y-3">
                    <input
                      type="email"
                      value={modalEmail}
                      onChange={(e) => setModalEmail(e.target.value)}
                      placeholder="tu@email.com"
                      required
                      disabled={modalStatus === 'loading'}
                      className="w-full font-body text-sm text-carbon bg-cream border border-carbon rounded-sm px-4 py-3 outline-none placeholder:text-mist focus:ring-2 focus:ring-lime/40 disabled:opacity-50 transition-all"
                    />
                    <button
                      type="submit"
                      disabled={modalStatus === 'loading' || !modalEmail}
                      className="w-full font-body font-semibold text-sm bg-lime text-carbon border border-carbon rounded-sm px-6 py-3 hover:bg-lime-hover transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {modalStatus === 'loading' ? 'Enviando...' : 'Recibir plantilla →'}
                    </button>
                  </form>
                  <p className="mt-3 font-body text-xs text-mist text-center">
                    Sin spam. Cancela cuando quieras.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
