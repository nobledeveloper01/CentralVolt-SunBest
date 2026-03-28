import { create } from 'zustand'

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'light'
  const saved = localStorage.getItem('cv-theme')
  if (saved === 'dark' || saved === 'light') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const useThemeStore = create((set, get) => ({
  theme: getInitialTheme(),

  toggleTheme: () => {
    const next = get().theme === 'light' ? 'dark' : 'light'
    set({ theme: next })
    localStorage.setItem('cv-theme', next)
    document.documentElement.classList.toggle('dark', next === 'dark')
  },

  initTheme: () => {
    const theme = get().theme
    document.documentElement.classList.toggle('dark', theme === 'dark')
  },
}))

export default useThemeStore
