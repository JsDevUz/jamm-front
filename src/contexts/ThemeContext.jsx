import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()
const DEFAULT_THEME = 'light'
const SUPPORTED_THEMES = new Set(['light', 'dark'])

const normalizeTheme = (value) => {
  const theme = String(value || '').trim().toLowerCase()
  return SUPPORTED_THEMES.has(theme) ? theme : DEFAULT_THEME
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Get theme from localStorage or default to light
    const savedTheme = localStorage.getItem('theme')
    return normalizeTheme(savedTheme)
  })

  useEffect(() => {
    const normalizedTheme = normalizeTheme(theme)

    if (normalizedTheme !== theme) {
      setTheme(normalizedTheme)
      return
    }

    // Apply theme to document
    document.documentElement.setAttribute('data-theme', normalizedTheme)
    
    // Save to localStorage
    localStorage.setItem('theme', normalizedTheme)
  }, [theme])

  const toggleTheme = (newTheme) => {
    setTheme(normalizeTheme(newTheme))
  }

  const themes = {
    dark: {
      name: 'Dark',
      colors: {
        primary: '#5865f2',
        background: '#36393f',
        secondary: '#2f3136',
        tertiary: '#202225',
        text: '#dcddde',
        textSecondary: '#b9bbbe',
        textMuted: '#72767d',
        border: '#40444b',
        hover: 'rgba(255, 255, 255, 0.1)',
        active: 'rgba(88, 101, 242, 0.1)',
        success: '#43b581',
        warning: '#faa61a',
        danger: '#f04747',
        input: '#40444b',
        placeholder: '#72767d'
      }
    },
    light: {
      name: 'Light',
      colors: {
        primary: '#5865f2',
        background: '#ffffff',
        secondary: '#f2f3f5',
        tertiary: '#e3e5e8',
        text: '#2e3338',
        textSecondary: '#4f5660',
        textMuted: '#747f8d',
        border: '#e3e5e8',
        hover: 'rgba(0, 0, 0, 0.05)',
        active: 'rgba(88, 101, 242, 0.1)',
        success: '#3ba55c',
        warning: '#faa61a',
        danger: '#ed4245',
        input: '#ebedef',
        placeholder: '#747f8d'
      }
    }
  }

  const currentTheme = themes[theme] || themes.light

  return (
    <ThemeContext.Provider value={{
      theme,
      currentTheme,
      themes,
      toggleTheme
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
