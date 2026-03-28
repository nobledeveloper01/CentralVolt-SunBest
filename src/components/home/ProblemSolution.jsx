import { Volume2, Fuel, Sun } from 'lucide-react'
import { motion } from 'motion/react'
import SectionHeading from '../ui/SectionHeading'
import AnimatedSection from '../ui/AnimatedSection'
import { staggerContainer, fadeUp, defaultTransition, viewportOnce } from '../../lib/animations'

const solutions = [
  { icon: Volume2, title: 'Silent Power', description: 'No generator noise — just clean, quiet electricity.' },
  { icon: Fuel, title: 'Zero Fuel Cost', description: 'Stop spending thousands on fuel every week.' },
  { icon: Sun, title: 'Reliable Daily Electricity', description: 'Works even when the main power grid is down.' },
]

export default function ProblemSolution() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-linear-to-br from-surface to-primary-light transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            title="Tired of Darkness, Fuel Costs, and Generator Wahala?"
            subtitle="Every day, Nigerians spend thousands on fuel, endure noise, and still don't have reliable electricity. Sun Best Solar Systems change everything."
          />
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          {solutions.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              transition={defaultTransition}
              whileHover={{ y: -6 }}
              className="text-center p-5 sm:p-6 md:p-8 rounded-2xl bg-surface-elevated border border-border hover:shadow-lg transition-all glow-card"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-linear-to-br from-primary/15 to-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5"
              >
                <item.icon size={24} className="sm:w-7 sm:h-7 text-primary" />
              </motion.div>
              <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-2 sm:mb-3">{item.title}</h3>
              <p className="text-sm sm:text-base text-text-secondary">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
