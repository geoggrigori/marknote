import { describe, it, expect } from 'vitest'
import { countWords, countChars } from './count'

describe('countWords', () => {
  it('returns 0 for an empty string', () => {
    expect(countWords('')).toBe(0)
  })

  it('returns 0 for whitespace only', () => {
    expect(countWords('   \n\t  ')).toBe(0)
  })

  it('counts a single word', () => {
    expect(countWords('hello')).toBe(1)
  })

  it('counts words separated by multiple spaces', () => {
    expect(countWords('hello   world')).toBe(2)
  })

  it('counts words across multiple lines', () => {
    expect(countWords('one two\nthree\nfour five')).toBe(5)
  })

  it('trims leading and trailing whitespace', () => {
    expect(countWords('  hello world  ')).toBe(2)
  })

  it('counts markdown syntax tokens as words', () => {
    expect(countWords('# Title\n\n- **bold** item')).toBe(5)
  })
})

describe('countChars', () => {
  it('returns 0 for an empty string', () => {
    expect(countChars('')).toBe(0)
  })

  it('counts whitespace characters', () => {
    expect(countChars('   ')).toBe(3)
  })

  it('counts every character including newlines', () => {
    expect(countChars('ab\ncd')).toBe(5)
  })

  it('counts markdown syntax characters', () => {
    expect(countChars('**hi**')).toBe(6)
  })
})
