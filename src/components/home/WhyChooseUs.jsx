import { Shield, CreditCard, BatteryFull, MapPin, Zap } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'

const reasons = [
  { icon: Shield, title: 'Designed for Nigerian Usage', description: 'Built to handle the realities of everyday Nigerian life.' },
  { icon: CreditCard, title: 'Flexible Payment Options', description: 'Pay full or spread payments over months.' },
  { icon: BatteryFull, title: 'Strong Battery Performance', description: 'Long-lasting battery that keeps your power going.' },
  { icon: MapPin, title: 'Local Support in Ikorodu', description: 'We are close by and always ready to help.' },
  { icon: Zap, title: 'Faster Installation', description: 'Get your system installed and running quickly.' },
]

export default function WhyChooseUs() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Why Thousands Choose Us Over Alternatives"
          subtitle="We don't just sell solar — we deliver reliable power solutions backed by local support."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {reasons.map((item) => (
            <div key={item.title} className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <item.icon size={20} className="sm:w-[22px] sm:h-[22px] text-primary" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-charcoal mb-0.5 sm:mb-1">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
