import { CheckCircle, ArrowRight } from 'lucide-react'
import AnimatedSection from '../ui/AnimatedSection'
import Button from '../ui/Button'

const steps = [
  'Pay a deposit',
  'Get your system installed',
  'Pay monthly',
  'Receive unlock code every month and enjoy',
]

export default function PaySmallSmall() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-linear-to-br from-secondary via-secondary to-[#0F1D35] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <AnimatedSection direction="left">
            <span className="inline-block bg-primary/20 text-primary px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
              Flexible Payment
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
              No Money? <span className="text-gradient">Start Small.</span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed">
              You don't need full payment. Start with a small deposit and spread the rest over months.
            </p>

            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2.5 sm:gap-3">
                  <CheckCircle size={18} className="text-primary shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-200">{step}</span>
                </li>
              ))}
            </ul>

            <Button to="/pay-small-small" variant="primary" size="md" className="w-full sm:w-auto btn-gradient">
              Check Payment Plan <ArrowRight size={18} />
            </Button>
          </AnimatedSection>

          {/* Payment Calculator Preview */}
          <AnimatedSection direction="right">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 sm:p-6 md:p-8 border border-white/20 glow-card">
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Quick Payment Calculator</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-white/10 rounded-xl p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-gray-400 mb-1">Example: Sun Best Basic</p>
                  <p className="text-xl sm:text-2xl font-bold text-primary">₦197,000</p>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-white/10 rounded-xl p-3 sm:p-4">
                    <p className="text-xs sm:text-sm text-gray-400 mb-1">Deposit (30%)</p>
                    <p className="text-base sm:text-lg font-bold">₦59,100</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 sm:p-4">
                    <p className="text-xs sm:text-sm text-gray-400 mb-1">Monthly (6 months)</p>
                    <p className="text-base sm:text-lg font-bold">₦22,983</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 text-center">
                  Full calculator available on the payment plan page
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
