import { Home, Store, Warehouse, Monitor, Laptop, ArrowRight } from 'lucide-react'
import Button from '../components/ui/Button'
import AnimatedSection from '../components/ui/AnimatedSection'

const audiences = [
  {
    icon: Home,
    title: 'Homes',
    description: 'Enjoy light, TV, and comfort every day',
    details: 'No more sitting in darkness or spending money on fuel. Sun Best powers your bulbs, fan, TV, and phone charging — all from the sun.',
    color: 'bg-orange-50 dark:bg-orange-900/15 border-orange-200 dark:border-orange-800/30',
    iconColor: 'text-primary',
  },
  {
    icon: Store,
    title: 'Shops',
    description: 'Work all day, and rake in profits without interruption',
    details: 'Keep your shop lit and your customers comfortable. Run your business without depending on unreliable power supply.',
    color: 'bg-blue-50 dark:bg-blue-900/15 border-blue-200 dark:border-blue-800/30',
    iconColor: 'text-secondary',
  },
  {
    icon: Warehouse,
    title: 'Big Stores',
    description: 'Protect your business from power outages',
    details: 'Ensure your goods stay safe and your operations run smoothly with reliable solar backup power.',
    color: 'bg-green-50 dark:bg-green-900/15 border-green-200 dark:border-green-800/30',
    iconColor: 'text-green-600 dark:text-green-400',
  },
  {
    icon: Monitor,
    title: 'Remote Workers',
    description: 'Stay connected and profitable',
    details: 'Power your workspace, keep your devices charged, and stay online for meetings and deadlines.',
    color: 'bg-purple-50 dark:bg-purple-900/15 border-purple-200 dark:border-purple-800/30',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
  {
    icon: Laptop,
    title: 'Young Professionals',
    description: 'Power laptops, WiFi, and devices',
    details: 'Whether you\'re freelancing, streaming, or studying — Sun Best keeps your lifestyle powered up.',
    color: 'bg-rose-50 dark:bg-rose-900/15 border-rose-200 dark:border-rose-800/30',
    iconColor: 'text-rose-600 dark:text-rose-400',
  },
]

export default function WhoItsForPage() {
  return (
    <>
      <section className="bg-secondary py-10 sm:py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              Power Solutions for Every Lifestyle
            </h1>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Whether you're at home, running a business, or working remotely — we have the right solar solution.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-8 sm:py-12 md:py-20 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 sm:space-y-6">
            {audiences.map((item) => (
              <div key={item.title} className={`rounded-xl sm:rounded-2xl border-2 p-4 sm:p-6 md:p-8 ${item.color} flex flex-col sm:flex-row items-start gap-3 sm:gap-4 md:gap-5`}>
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-surface flex items-center justify-center shrink-0">
                  <item.icon size={22} className={`sm:w-6 sm:h-6 md:w-7 md:h-7 ${item.iconColor}`} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-0.5 sm:mb-1">{item.title}</h3>
                  <p className="text-primary font-semibold text-xs sm:text-sm mb-1.5 sm:mb-2">{item.description}</p>
                  <p className="text-xs sm:text-sm md:text-base text-text-secondary">{item.details}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Button to="/products" size="md" className="w-full sm:w-auto">
              Find Your Perfect System <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
