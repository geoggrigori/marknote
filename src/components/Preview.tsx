import { useMemo } from 'react'
import { renderMarkdown } from '../lib/markdown'

interface PreviewProps {
  source: string
}

export function Preview({ source }: PreviewProps) {
  const html = useMemo(() => renderMarkdown(source), [source])

  return (
    <section className="preview pane">
      <header className="pane-header">Preview</header>
      <div
        className="preview-body markdown"
        // Content is sanitized with DOMPurify in renderMarkdown.
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  )
}
