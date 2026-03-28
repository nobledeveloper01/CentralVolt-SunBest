import { Shield, CreditCard, BatteryFull, MapPin, Zap } from 'lucide-react'
import { motion } from 'motion/react'
import SectionHeading from '../ui/SectionHeading'
import AnimatedSection from '../ui/AnimatedSection'
import { staggerContainer, fadeUp, defaultTransition, viewportOnce } from '../../lib/animations'

const reasons = [
  { icon: Shield, title: 'Designed for Nigerian Usage', description: 'Built to handle the realities of everyday Nigerian life.' },
  { icon: CreditCard, title: 'Flexible Payment Options', description: 'Pay full or spread payments over months.' },
  { icon: BatteryFull, title: 'Strong Battery Performance', description: 'Long-lasting battery that keeps your power going.' },
  { icon: MapPin, title: 'Local Support in Ikorodu', description: 'We are close by and always ready to help.' },
  { icon: Zap, title: 'Faster Installation', description: 'Get your system installed and running quickly.' },
]

export default function WhyChooseUs() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-linear-to-br from-surface-alt via-surface to-primary-light/30 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            title="Why Thousands Choose Us Over Alternatives"
            subtitle="We don't just sell solar — we deliver reliable power solutions backed by local support."
          />
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
        >
          {reasons.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              transition={defaultTransition}
              whileHover={{ y: -4 }}
              className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 bg-surface-elevated border border-border rounded-2xl shadow-sm hover:shadow-md transition-all glow-card"
            >
              <motion.div
                whileHover={{ rotate: 10 }}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-primary/15 to-primary/5 rounded-xl flex items-center justify-center shrink-0"
              >
                <item.icon size={20} className="sm:w-[22px] sm:h-[22px] text-primary" />
              </motion.div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-text-primary mb-0.5 sm:mb-1">{item.title}</h3>
                <p className="text-xs sm:text-sm text-text-secondary">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
