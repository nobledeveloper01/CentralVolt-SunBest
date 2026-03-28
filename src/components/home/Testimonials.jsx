import { Star, Quote } from 'lucide-react'
import { motion } from 'motion/react'
import SectionHeading from '../ui/SectionHeading'
import AnimatedSection from '../ui/AnimatedSection'
import { staggerContainer, scaleIn, defaultTransition, viewportOnce } from '../../lib/animations'

const testimonials = [
  {
    quote: 'I stopped buying fuel completely. Sun Best has saved me thousands every month.',
    name: 'Mama Ngozi',
    role: 'Home Owner, Ikorodu',
  },
  {
    quote: 'My shop runs daily without stress. Customers can come anytime and I have light.',
    name: 'Alhaji Musa',
    role: 'Shop Owner, Lagos',
  },
  {
    quote: 'Best investment I\'ve made. My children can study at night and we watch TV together.',
    name: 'Mrs. Adebayo',
    role: 'Mother of 3, Ikorodu',
  },
]

export default function Testimonials() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-surface transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            title="What Our Customers Say"
            subtitle="Real stories from real Nigerians enjoying reliable solar power."
          />
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              transition={defaultTransition}
              className="bg-primary-light border border-border rounded-2xl p-5 sm:p-6 md:p-8 relative glow-card glow-top"
            >
              <Quote size={28} className="sm:w-8 sm:h-8 text-primary/20 absolute top-4 right-4 sm:top-6 sm:right-6" />
              <div className="flex gap-0.5 sm:gap-1 mb-3 sm:mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} className="sm:w-4 sm:h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm sm:text-base text-text-primary mb-4 sm:mb-6 leading-relaxed italic">"{t.quote}"</p>
              <div>
                <p className="font-bold text-text-primary text-sm sm:text-base">{t.name}</p>
                <p className="text-xs sm:text-sm text-text-secondary">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
