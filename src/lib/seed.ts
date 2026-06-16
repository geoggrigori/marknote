import type { Note } from '../types'
import { createNote } from './notes'

const WELCOME = `# Welcome to marknote

A fast Markdown notes app with **live preview**.

- Write Markdown on the left
- See the rendered result on the right
- Notes are saved to your browser automatically

Try some _formatting_, a [link](https://example.com), or a list:

1. Create a note
2. Edit it
3. Delete it when you're done
`

const CHEATSHEET = `# Markdown cheatsheet

## Headings
Use \`#\`, \`##\`, \`###\` for headings.

## Emphasis
*italic*, **bold**, ~~strikethrough~~

## Code
Inline \`code\` and blocks:

\`\`\`js
const greet = (name) => \`Hello, \${name}!\`
\`\`\`

## Quote
> Stay focused. Keep writing.
`

/** Sample notes seeded on first load when no notes exist yet. */
export function seedNotes(): Note[] {
  return [createNote(WELCOME), createNote(CHEATSHEET)]
}
