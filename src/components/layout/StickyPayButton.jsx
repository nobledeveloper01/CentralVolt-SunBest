import { Link } from 'react-router-dom'
import { CreditCard } from 'lucide-react'

export default function StickyPayButton() {
  return (
    <Link
      to="/pay-small-small"
      className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 bg-primary hover:bg-primary-dark text-white px-3 py-2.5 sm:px-5 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold"
    >
      <CreditCard size={16} className="sm:w-[18px] sm:h-[18px]" />
      <span className="hidden xs:inline">Pay Small Small</span>
      <span className="xs:hidden">Pay Now</span>
    </Link>
  )
}
