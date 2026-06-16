import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Note } from '../types'
import * as helpers from '../lib/notes'
import { loadNotes, saveNotes } from '../lib/storage'
import { seedNotes } from '../lib/seed'

interface UseNotesResult {
  notes: Note[]
  filtered: Note[]
  selectedId: string | null
  selected: Note | null
  query: string
  setQuery: (query: string) => void
  select: (id: string) => void
  create: () => void
  edit: (id: string, body: string) => void
  remove: (id: string) => void
}

function initNotes(): Note[] {
  const stored = loadNotes()
  if (stored && stored.length > 0) return stored
  return seedNotes()
}

export function useNotes(): UseNotesResult {
  const [notes, setNotes] = useState<Note[]>(initNotes)
  const [selectedId, setSelectedId] = useState<string | null>(
    () => notes[0]?.id ?? null,
  )
  const [query, setQuery] = useState('')

  useEffect(() => {
    saveNotes(notes)
  }, [notes])

  const filtered = useMemo(
    () => helpers.searchNotes(notes, query),
    [notes, query],
  )

  const selected = useMemo(
    () => notes.find((note) => note.id === selectedId) ?? null,
    [notes, selectedId],
  )

  const select = useCallback((id: string) => setSelectedId(id), [])

  const create = useCallback(() => {
    const note = helpers.createNote('')
    setNotes((prev) => helpers.addNote(prev, note))
    setSelectedId(note.id)
    setQuery('')
  }, [])

  const edit = useCallback((id: string, body: string) => {
    setNotes((prev) => helpers.updateNote(prev, id, body))
  }, [])

  const remove = useCallback(
    (id: string) => {
      setNotes((prev) => {
        const next = helpers.deleteNote(prev, id)
        if (id === selectedId) {
          setSelectedId(next[0]?.id ?? null)
        }
        return next
      })
    },
    [selectedId],
  )

  return {
    notes,
    filtered,
    selectedId,
    selected,
    query,
    setQuery,
    select,
    create,
    edit,
    remove,
  }
}
