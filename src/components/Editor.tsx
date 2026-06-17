import { countWords, countChars } from '../lib/count'

interface EditorProps {
  value: string
  onChange: (value: string) => void
  filename?: string
}

function downloadMarkdown(value: string, filename: string) {
  const safeName = filename.trim() || 'note'
  const blob = new Blob([value], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = safeName.toLowerCase().endsWith('.md')
    ? safeName
    : `${safeName}.md`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function Editor({ value, onChange, filename = 'note' }: EditorProps) {
  const words = countWords(value)
  const chars = countChars(value)

  return (
    <section className="editor pane">
      <header className="pane-header editor-header">
        <span>Editor</span>
        <button
          type="button"
          className="btn-export"
          onClick={() => downloadMarkdown(value, filename)}
          title="Download this note as a Markdown file"
        >
          Export as .md
        </button>
      </header>
      <textarea
        className="editor-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write Markdown here…"
        spellCheck={false}
        aria-label="Markdown editor"
      />
      <footer className="editor-stats" aria-label="Document statistics">
        {words} {words === 1 ? 'word' : 'words'} · {chars}{' '}
        {chars === 1 ? 'character' : 'characters'}
      </footer>
    </section>
  )
}
