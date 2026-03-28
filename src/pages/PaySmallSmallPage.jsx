import { useState } from 'react'
import { CheckCircle, ArrowRight, AlertCircle } from 'lucide-react'
import { products, formatPrice } from '../data/products'
import Button from '../components/ui/Button'
import AnimatedSection from '../components/ui/AnimatedSection'

export default function PaySmallSmallPage() {
  const [selectedProduct, setSelectedProduct] = useState(products[0].id)
  const [months, setMonths] = useState(6)

  const product = products.find((p) => p.id === selectedProduct)
  const deposit = Math.round(product.price * 0.3)
  const remaining = product.price - deposit
  const monthly = Math.round(remaining / months)

  const steps = [
    { step: 1, title: 'Choose your system', desc: 'Pick the Sun Best package that fits your needs.' },
    { step: 2, title: 'Pay a small deposit', desc: 'Start with just 30% of the total price.' },
    { step: 3, title: 'We install it', desc: 'Our team comes to set up your system.' },
    { step: 4, title: 'Pay monthly', desc: 'Spread the remaining balance over months.' },
    { step: 5, title: 'Get monthly unlock code', desc: 'Receive your code and enjoy uninterrupted power.' },
  ]

  const notes = [
    'Payments are flexible',
    'No hidden charges',
    'Support available always',
  ]

  return (
    <>
      {/* Hero */}
      <section className="bg-secondary py-10 sm:py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              Own Solar Without Paying Everything Upfront
            </h1>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              We understand money can be tight. That's why we created a system that allows you to pay a small deposit, use your solar immediately, and pay gradually over time.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-8 sm:py-12 md:py-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            {/* Calculator */}
            <div className="bg-surface rounded-2xl shadow-lg border border-border p-4 sm:p-6 md:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 sm:mb-6">Payment Calculator</h2>

              <div className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-text-primary mb-1.5 sm:mb-2">
                    Select Package
                  </label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full border border-border rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — {formatPrice(p.price)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-text-primary mb-1.5 sm:mb-2">
                    Repayment Duration
                  </label>
                  <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                    {[3, 6, 9, 12].map((m) => (
                      <button
                        key={m}
                        onClick={() => setMonths(m)}
                        className={`py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                          months === m
                            ? 'bg-primary text-white'
                            : 'bg-surface-alt text-text-secondary hover:bg-surface-alt'
                        }`}
                      >
                        {m}mo
                      </button>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div className="bg-primary-lighter rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-text-secondary">Total Price</span>
                    <span className="text-lg sm:text-xl font-bold text-text-primary">{formatPrice(product.price)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-text-secondary">Deposit (30%)</span>
                    <span className="text-lg sm:text-xl font-bold text-primary">{formatPrice(deposit)}</span>
                  </div>
                  <div className="border-t border-primary/20 pt-3 sm:pt-4 flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-text-secondary">Monthly Payment</span>
                    <div className="text-right">
                      <span className="text-xl sm:text-2xl font-bold text-text-primary">{formatPrice(monthly)}</span>
                      <span className="text-xs sm:text-sm font-normal text-text-secondary">/month</span>
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-xs text-text-secondary text-center">
                    for {months} months after deposit
                  </p>
                </div>

                <Button to="/products" className="w-full" size="md">
                  Start Your Plan Today <ArrowRight size={18} />
                </Button>
              </div>
            </div>

            {/* How it works */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-5 sm:mb-8">How It Works</h2>
              <div className="space-y-4 sm:space-y-6">
                {steps.map((s) => (
                  <div key={s.step} className="flex gap-3 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base shrink-0">
                      {s.step}
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-text-primary">{s.title}</h3>
                      <p className="text-xs sm:text-sm text-text-secondary">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Important Notes */}
              <div className="mt-8 sm:mt-10 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <h3 className="text-sm sm:text-base font-bold text-text-primary mb-2 sm:mb-3 flex items-center gap-2">
                  <AlertCircle size={16} className="sm:w-[18px] sm:h-[18px] text-green-600" />
                  Important Notes
                </h3>
                <ul className="space-y-1.5 sm:space-y-2">
                  {notes.map((note) => (
                    <li key={note} className="flex items-center gap-2 text-text-secondary text-xs sm:text-sm">
                      <CheckCircle size={14} className="sm:w-4 sm:h-4 text-green-500 shrink-0" />
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
