import { Home, Store, Warehouse, Monitor, Laptop } from 'lucide-react'
import { motion } from 'motion/react'
import SectionHeading from '../ui/SectionHeading'
import AnimatedSection from '../ui/AnimatedSection'
import shopImage from '../../assets/image1.jpeg'
import { staggerContainer, fadeUp, defaultTransition, viewportOnce } from '../../lib/animations'

const audiences = [
  { icon: Home, title: 'Homes', description: 'No more darkness', color: 'bg-orange-50 dark:bg-primary-light text-primary' },
  { icon: Store, title: 'Shops', description: 'Work all day', color: 'bg-blue-50 dark:bg-secondary/20 text-secondary' },
  { icon: Warehouse, title: 'Big Stores', description: 'Protect your goods', color: 'bg-green-50 dark:bg-green-900/20 text-green-600' },
  { icon: Monitor, title: 'Remote Workers', description: 'Stay online always', color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' },
  { icon: Laptop, title: 'Young Professionals', description: 'Power your lifestyle', color: 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400' },
]

export default function WhoItsFor() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-surface transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            title="Built for Real Nigerians"
            subtitle="Whether you're at home, running a shop, or working remotely — Sun Best has a solution for you."
          />
        </AnimatedSection>

        {/* Lifestyle banner */}
        <AnimatedSection className="mb-8 sm:mb-10 md:mb-12">
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden">
            <img
              src={shopImage}
              alt="Nigerian shop powered by Sun Best solar system"
              className="w-full h-48 sm:h-56 md:h-72 object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-charcoal/80 via-charcoal/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
              <p className="text-white text-base sm:text-lg md:text-xl font-bold">
                "My shop runs daily without stress — Sun Best changed everything."
              </p>
              <p className="text-gray-300 text-xs sm:text-sm mt-1">Shop owner, powered by Sun Best SHS</p>
            </div>
          </div>
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6"
        >
          {audiences.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              transition={defaultTransition}
              whileHover={{ y: -4 }}
              className="text-center p-4 sm:p-5 md:p-6 rounded-2xl bg-surface-alt border border-border hover:shadow-md transition-all glow-card"
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2.5 sm:mb-3 md:mb-4 ${item.color}`}>
                <item.icon size={20} className="sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-text-primary mb-0.5 sm:mb-1">{item.title}</h3>
              <p className="text-xs sm:text-sm text-text-secondary">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
