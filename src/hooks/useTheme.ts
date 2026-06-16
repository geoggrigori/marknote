import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const THEME_KEY = 'marknote.theme'

function initTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // ignore
  }
  if (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark'
  }
  return 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(initTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch {
      // ignore
    }
  }, [theme])

  const toggle = useCallback(
    () => setTheme((t) => (t === 'light' ? 'dark' : 'light')),
    [],
  )

  return { theme, toggle }
}
