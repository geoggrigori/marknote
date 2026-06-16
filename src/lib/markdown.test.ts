import { describe, it, expect } from 'vitest'
import { renderMarkdown } from './markdown'

describe('renderMarkdown', () => {
  it('renders headings to HTML', () => {
    const html = renderMarkdown('# Title')
    expect(html).toContain('<h1')
    expect(html).toContain('Title')
  })

  it('renders bold and links', () => {
    const html = renderMarkdown('**bold** and [link](https://example.com)')
    expect(html).toContain('<strong>bold</strong>')
    expect(html).toContain('href="https://example.com"')
  })

  it('renders lists', () => {
    const html = renderMarkdown('- one\n- two')
    expect(html).toContain('<ul>')
    expect(html).toContain('<li>one')
  })

  it('sanitizes malicious script tags', () => {
    const html = renderMarkdown('<img src=x onerror="alert(1)">hi')
    expect(html).not.toContain('onerror')
  })

  it('strips script elements', () => {
    const html = renderMarkdown('text <script>alert("xss")</script> more')
    expect(html).not.toContain('<script>')
    expect(html).not.toContain('alert("xss")')
  })

  it('handles empty input gracefully', () => {
    expect(renderMarkdown('')).toBe('')
  })
})
