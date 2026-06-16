import { marked } from 'marked'
import DOMPurify from 'dompurify'

marked.setOptions({
  gfm: true,
  breaks: true,
})

/** Render Markdown to a sanitized HTML string safe for innerHTML. */
export function renderMarkdown(source: string): string {
  const rawHtml = marked.parse(source ?? '', { async: false }) as string
  return DOMPurify.sanitize(rawHtml)
}
