interface EditorProps {
  value: string
  onChange: (value: string) => void
}

export function Editor({ value, onChange }: EditorProps) {
  return (
    <section className="editor pane">
      <header className="pane-header">Editor</header>
      <textarea
        className="editor-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write Markdown here…"
        spellCheck={false}
        aria-label="Markdown editor"
      />
    </section>
  )
}
