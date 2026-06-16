import type { Note } from '../types'

/** Generate a reasonably unique id without external dependencies. */
export function createId(): string {
  return (
    Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
  )
}

/** Derive a short title from the first non-empty line of the body. */
export function deriveTitle(body: string): string {
  const firstLine = body
    .split('\n')
    .map((line) => line.replace(/^#+\s*/, '').trim())
    .find((line) => line.length > 0)
  if (!firstLine) return 'Untitled note'
  return firstLine.length > 60 ? firstLine.slice(0, 60) + '…' : firstLine
}

export function createNote(body = ''): Note {
  const now = Date.now()
  return {
    id: createId(),
    title: deriveTitle(body),
    body,
    createdAt: now,
    updatedAt: now,
  }
}

/** Insert a new note at the top of the list. */
export function addNote(notes: Note[], note: Note): Note[] {
  return [note, ...notes]
}

/** Update a note's body (and re-derive its title) immutably. */
export function updateNote(
  notes: Note[],
  id: string,
  body: string,
): Note[] {
  return notes.map((note) =>
    note.id === id
      ? {
          ...note,
          body,
          title: deriveTitle(body),
          updatedAt: Date.now(),
        }
      : note,
  )
}

/** Remove a note by id immutably. */
export function deleteNote(notes: Note[], id: string): Note[] {
  return notes.filter((note) => note.id !== id)
}

/** Case-insensitive full-text filter over title and body. */
export function searchNotes(notes: Note[], query: string): Note[] {
  const q = query.trim().toLowerCase()
  if (!q) return notes
  return notes.filter(
    (note) =>
      note.title.toLowerCase().includes(q) ||
      note.body.toLowerCase().includes(q),
  )
}
