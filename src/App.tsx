import { useNotes } from './hooks/useNotes'
import { useTheme } from './hooks/useTheme'
import { Sidebar } from './components/Sidebar'
import { Editor } from './components/Editor'
import { Preview } from './components/Preview'
import './App.css'

function App() {
  const {
    filtered,
    selectedId,
    selected,
    query,
    setQuery,
    select,
    create,
    edit,
    remove,
  } = useNotes()
  const { theme, toggle } = useTheme()

  return (
    <div className="app">
      <header className="topbar">
        <h1 className="brand">
          <span className="brand-mark">◆</span> marknote
        </h1>
        <button
          className="theme-toggle"
          onClick={toggle}
          aria-label="Toggle theme"
          title="Toggle light/dark theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </header>

      <div className="layout">
        <Sidebar
          notes={filtered}
          selectedId={selectedId}
          query={query}
          onQueryChange={setQuery}
          onSelect={select}
          onCreate={create}
          onDelete={remove}
        />

        <main className="workspace">
          {selected ? (
            <div className="split">
              <Editor
                value={selected.body}
                onChange={(body) => edit(selected.id, body)}
                filename={selected.title}
              />
              <Preview source={selected.body} />
            </div>
          ) : (
            <div className="empty-state">
              <p>No note selected.</p>
              <button className="btn-new" onClick={create}>
                + Create your first note
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
