import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import Header from './Header'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'
import StickyPayButton from './StickyPayButton'
import ScrollToTop from './ScrollToTop'
import PageTransition from '../ui/PageTransition'
import useThemeStore from '../../store/themeStore'

export default function Layout() {
  const location = useLocation()
  const initTheme = useThemeStore((s) => s.initTheme)

  useEffect(() => {
    initTheme()
  }, [initTheme])

  return (
    <div className="min-h-screen flex flex-col bg-surface text-text-primary transition-colors duration-300">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppButton />
      <StickyPayButton />
    </div>
  )
}
