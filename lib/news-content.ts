import type { PayloadRequest } from 'payload'
import type { SerializedEditorState } from 'lexical'
import {
  convertHTMLToLexical,
  convertLexicalToHTML,
  defaultHTMLConverters,
  editorConfigFactory,
} from '@payloadcms/richtext-lexical'
import { JSDOM } from 'jsdom'

type LexicalContent = {
  root?: {
    children?: unknown[]
  }
}

export function isLexicalContent(value: unknown): value is LexicalContent {
  return (
    typeof value === 'object' &&
    value !== null &&
    'root' in value &&
    typeof (value as { root?: unknown }).root === 'object'
  )
}

async function htmlToLexical(value: string, req: PayloadRequest) {
  const editorConfig = await editorConfigFactory.default({ config: req.payload.config })

  return convertHTMLToLexical({
    editorConfig,
    html: value,
    JSDOM,
  })
}

export async function normalizeNewsContentValue(value: unknown, req: PayloadRequest) {
  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed) return value
    return htmlToLexical(trimmed, req)
  }

  return value
}

export function newsContentToHTML(value: unknown) {
  if (typeof value === 'string') return value
  if (isLexicalContent(value)) {
    return convertLexicalToHTML({
      converters: defaultHTMLConverters,
      data: value as SerializedEditorState,
    })
  }

  return ''
}
