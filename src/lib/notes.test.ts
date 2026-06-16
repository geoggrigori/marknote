import { describe, it, expect } from 'vitest'
import {
  addNote,
  createNote,
  deleteNote,
  deriveTitle,
  searchNotes,
  updateNote,
} from './notes'

describe('deriveTitle', () => {
  it('uses the first non-empty line and strips heading markers', () => {
    expect(deriveTitle('# Hello world\n\nbody')).toBe('Hello world')
  })

  it('falls back to a default for empty content', () => {
    expect(deriveTitle('   \n\n')).toBe('Untitled note')
  })

  it('truncates very long titles', () => {
    const title = deriveTitle('a'.repeat(100))
    expect(title.endsWith('…')).toBe(true)
    expect(title.length).toBe(61)
  })
})

describe('createNote / addNote', () => {
  it('creates a note with a derived title and timestamps', () => {
    const note = createNote('# My note')
    expect(note.title).toBe('My note')
    expect(note.id).toBeTruthy()
    expect(note.createdAt).toBeGreaterThan(0)
  })

  it('adds a note to the top of the list', () => {
    const a = createNote('first')
    const b = createNote('second')
    const list = addNote(addNote([], a), b)
    expect(list).toHaveLength(2)
    expect(list[0].id).toBe(b.id)
  })
})

describe('updateNote', () => {
  it('updates body and re-derives title immutably', () => {
    const note = createNote('# old')
    const list = [note]
    const updated = updateNote(list, note.id, '# new title\nmore')
    expect(updated[0].body).toBe('# new title\nmore')
    expect(updated[0].title).toBe('new title')
    // original untouched
    expect(list[0].body).toBe('# old')
  })

  it('leaves other notes unchanged', () => {
    const a = createNote('a')
    const b = createNote('b')
    const updated = updateNote([a, b], a.id, 'changed')
    expect(updated[1]).toBe(b)
  })
})

describe('deleteNote', () => {
  it('removes a note by id', () => {
    const a = createNote('a')
    const b = createNote('b')
    const result = deleteNote([a, b], a.id)
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(b.id)
  })
})

describe('searchNotes', () => {
  const notes = [
    createNote('Shopping list\nmilk and eggs'),
    createNote('Meeting notes\ndiscuss budget'),
  ]

  it('returns all notes for an empty query', () => {
    expect(searchNotes(notes, '   ')).toHaveLength(2)
  })

  it('matches against the body case-insensitively', () => {
    const result = searchNotes(notes, 'BUDGET')
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Meeting notes')
  })

  it('matches against the title', () => {
    const result = searchNotes(notes, 'shopping')
    expect(result).toHaveLength(1)
  })

  it('returns nothing when there is no match', () => {
    expect(searchNotes(notes, 'nonexistent')).toHaveLength(0)
  })
})
