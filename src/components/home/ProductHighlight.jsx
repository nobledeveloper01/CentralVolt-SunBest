import SectionHeading from '../ui/SectionHeading'
import ProductCard from '../products/ProductCard'
import Button from '../ui/Button'
import { products } from '../../data/products'

export default function ProductHighlight() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Choose Your Power Level"
          subtitle="From basic lighting to full home entertainment — we have the right solar system for you."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-10">
          <Button to="/products" variant="outline" size="md" className="w-full sm:w-auto">
            Compare All Packages
          </Button>
        </div>
      </div>
    </section>
  )
}
