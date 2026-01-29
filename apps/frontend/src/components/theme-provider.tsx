'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'
import { useTheme } from 'next-themes'

function ThemeWatcher() {
  const { theme, resolvedTheme } = useTheme()

  React.useEffect(() => {
    // Disable transitions when theme changes
    const root = document.documentElement
    root.classList.add('theme-transitioning')

    // Remove after a short delay to allow instant theme change
    const timer = setTimeout(() => {
      root.classList.remove('theme-transitioning')
    }, 1)

    return () => clearTimeout(timer)
  }, [theme, resolvedTheme])

  return null
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <ThemeWatcher />
      {children}
    </NextThemesProvider>
  )
}
