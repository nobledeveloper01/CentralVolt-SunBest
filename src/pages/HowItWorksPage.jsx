import { ArrowRight } from 'lucide-react'
import Button from '../components/ui/Button'

const steps = [
  { step: 1, title: 'Choose Your Product', desc: 'Browse our range and pick the Sun Best system that fits your needs and budget.', color: 'bg-primary' },
  { step: 2, title: 'Make Deposit', desc: 'Pay a small deposit — as low as 30% — to get started immediately.', color: 'bg-secondary' },
  { step: 3, title: 'Installation', desc: 'Our team comes to your location and sets up your solar system quickly and professionally.', color: 'bg-primary' },
  { step: 4, title: 'Monthly Payment', desc: 'Pay the remaining balance in small monthly installments that work with your budget.', color: 'bg-secondary' },
  { step: 5, title: 'Enjoy Uninterrupted Power', desc: 'Receive your unlock code every month and enjoy clean, quiet, reliable electricity.', color: 'bg-primary' },
]

export default function HowItWorksPage() {
  return (
    <>
      <section className="bg-secondary py-10 sm:py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
            Simple. Fast. Reliable.
          </h1>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Getting solar power has never been easier. Follow these simple steps and start enjoying electricity today.
          </p>
        </div>
      </section>

      <section className="py-8 sm:py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-5 md:left-6 top-0 bottom-0 w-0.5 bg-gray-200 hidden sm:block" />

            <div className="space-y-6 sm:space-y-8 md:space-y-10">
              {steps.map((s) => (
                <div key={s.step} className="flex gap-3 sm:gap-4 md:gap-6 relative">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 ${s.color} text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base md:text-lg shrink-0 relative z-10`}>
                    {s.step}
                  </div>
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6 flex-1">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-charcoal mb-1 sm:mb-2">{s.title}</h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-10 sm:mt-14">
            <Button to="/products" size="md" className="w-full sm:w-auto">
              Get Started Now <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
