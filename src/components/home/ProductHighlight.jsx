import { motion } from 'motion/react'
import SectionHeading from '../ui/SectionHeading'
import ProductCard from '../products/ProductCard'
import Button from '../ui/Button'
import AnimatedSection from '../ui/AnimatedSection'
import { products } from '../../data/products'
import { staggerContainer, fadeUp, defaultTransition, viewportOnce } from '../../lib/animations'

export default function ProductHighlight() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-linear-to-b from-surface-alt to-surface transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            title="Choose Your Power Level"
            subtitle="From basic lighting to full home entertainment — we have the right solar system for you."
          />
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={fadeUp} transition={defaultTransition}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        <AnimatedSection delay={0.3} className="text-center mt-8 sm:mt-10">
          <Button to="/products" variant="outline" size="md" className="w-full sm:w-auto">
            Compare All Packages
          </Button>
        </AnimatedSection>
      </div>
    </section>
  )
}
