'use client'

import { useRef } from 'react'
import Image from 'next/image'

export default function ArticleImage({ src, alt }: { src: string; alt: string }) {
  const dialog = useRef<HTMLDialogElement>(null)

  return (
    <div className="mb-8">
      <button
        type="button"
        aria-label={`Ampliar imagen: ${alt}`}
        aria-haspopup="dialog"
        onClick={() => dialog.current?.showModal()}
        className="block w-full cursor-zoom-in rounded-sm border border-carbon bg-parchment shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        <Image src={src} alt={alt} width={1600} height={900} priority
          sizes="(max-width: 768px) 100vw, 768px"
          className="w-full h-auto max-h-[70vh] object-contain" />
        <span className="block py-2 text-xs font-body text-ink">Pulsa para ampliar</span>
      </button>
      <dialog ref={dialog} aria-label="Imagen ampliada"
        className="fixed inset-0 m-auto h-[90dvh] w-[96vw] max-w-none max-h-none border-0 bg-carbon p-0 text-cream backdrop:bg-black/80">
        <div className="flex h-full flex-col">
          <div className="flex justify-end p-3">
            <button type="button" autoFocus onClick={() => dialog.current?.close()}
              className="rounded-sm border border-cream px-4 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
              Cerrar ✕
            </button>
          </div>
          <div className="relative min-h-0 flex-1">
            <Image src={src} alt={alt} fill unoptimized sizes="96vw" className="object-contain" />
          </div>
        </div>
      </dialog>
    </div>
  )
}
