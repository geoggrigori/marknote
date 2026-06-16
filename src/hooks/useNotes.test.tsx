import { describe, it, expect, beforeEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useNotes } from './useNotes'

describe('useNotes', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('seeds default notes on first load', () => {
    const { result } = renderHook(() => useNotes())
    expect(result.current.notes.length).toBeGreaterThan(0)
    expect(result.current.selectedId).toBe(result.current.notes[0].id)
  })

  it('creates a new note and selects it', () => {
    const { result } = renderHook(() => useNotes())
    const before = result.current.notes.length
    act(() => result.current.create())
    expect(result.current.notes.length).toBe(before + 1)
    expect(result.current.selectedId).toBe(result.current.notes[0].id)
  })

  it('edits the selected note body and title', () => {
    const { result } = renderHook(() => useNotes())
    act(() => result.current.create())
    const id = result.current.selectedId!
    act(() => result.current.edit(id, '# Groceries\nmilk'))
    expect(result.current.selected?.body).toBe('# Groceries\nmilk')
    expect(result.current.selected?.title).toBe('Groceries')
  })

  it('deletes a note and reselects another', () => {
    const { result } = renderHook(() => useNotes())
    const id = result.current.selectedId!
    act(() => result.current.remove(id))
    expect(result.current.notes.find((n) => n.id === id)).toBeUndefined()
    expect(result.current.selectedId).not.toBe(id)
  })

  it('filters notes via the search query', () => {
    const { result } = renderHook(() => useNotes())
    act(() => result.current.create())
    const id = result.current.selectedId!
    act(() => result.current.edit(id, 'unique-marker-xyz'))
    act(() => result.current.setQuery('unique-marker-xyz'))
    expect(result.current.filtered).toHaveLength(1)
    expect(result.current.filtered[0].id).toBe(id)
  })

  it('persists notes to localStorage', () => {
    const { result } = renderHook(() => useNotes())
    act(() => result.current.create())
    const stored = localStorage.getItem('marknote.notes.v1')
    expect(stored).toBeTruthy()
    expect(JSON.parse(stored!).length).toBe(result.current.notes.length)
  })
})
