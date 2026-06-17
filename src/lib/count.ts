/** Count the words in a string (whitespace-separated tokens). */
export function countWords(text: string): number {
  const trimmed = (text ?? '').trim()
  if (!trimmed) return 0
  return trimmed.split(/\s+/).length
}

/** Count the characters in a string, including whitespace. */
export function countChars(text: string): number {
  return (text ?? '').length
}
