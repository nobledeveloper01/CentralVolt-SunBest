import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingCart, Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import useCartStore from '../../store/cartStore'
import useThemeStore from '../../store/themeStore'
import logo1 from '../../assets/logo1.png'
import logo2 from '../../assets/logo2.png'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/pay-small-small', label: 'Pay Small Small' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const totalItems = useCartStore((s) => s.getTotalItems())
  const { theme, toggleTheme } = useThemeStore()

  return (
    <header className="bg-surface sticky top-0 z-50 shadow-sm border-b border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src={theme === 'dark' ? logo2 : logo1} alt="Centravolt Solar" className="h-8 sm:h-10 md:h-12 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'text-primary bg-primary-light'
                    : 'text-text-primary hover:text-primary hover:bg-surface-alt'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-text-secondary hover:text-primary hover:bg-surface-alt transition-all"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} className="text-primary" />}
              </motion.div>
            </button>

            <Link
              to="/cart"
              className="relative p-2 text-text-primary hover:text-primary transition-colors"
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>

            <Link
              to="/products"
              className="hidden sm:inline-flex btn-gradient text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
            >
              Get Started
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-text-primary hover:text-primary"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-surface border-t border-border overflow-hidden"
          >
            <nav className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? 'text-primary bg-primary-light'
                      : 'text-text-primary hover:text-primary hover:bg-surface-alt'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/products"
                onClick={() => setMobileOpen(false)}
                className="block text-center btn-gradient text-white px-5 py-3 rounded-full text-sm font-semibold mt-3"
              >
                Get Started
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
