import type { Note } from '../types'

interface SidebarProps {
  notes: Note[]
  selectedId: string | null
  query: string
  onQueryChange: (query: string) => void
  onSelect: (id: string) => void
  onCreate: () => void
  onDelete: (id: string) => void
}

function preview(body: string): string {
  const text = body.replace(/[#>*_`~\-]/g, '').trim()
  return text.length > 80 ? text.slice(0, 80) + '…' : text || 'No content'
}

export function Sidebar({
  notes,
  selectedId,
  query,
  onQueryChange,
  onSelect,
  onCreate,
  onDelete,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-actions">
        <input
          type="search"
          className="search"
          placeholder="Search notes…"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          aria-label="Search notes"
        />
        <button className="btn-new" onClick={onCreate} aria-label="New note">
          + New
        </button>
      </div>
      <ul className="note-list">
        {notes.length === 0 && (
          <li className="note-empty">No notes found</li>
        )}
        {notes.map((note) => (
          <li
            key={note.id}
            className={
              'note-item' + (note.id === selectedId ? ' active' : '')
            }
          >
            <button
              className="note-item-main"
              onClick={() => onSelect(note.id)}
            >
              <span className="note-title">{note.title}</span>
              <span className="note-preview">{preview(note.body)}</span>
            </button>
            <button
              className="note-delete"
              onClick={() => onDelete(note.id)}
              aria-label={`Delete ${note.title}`}
              title="Delete note"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}
