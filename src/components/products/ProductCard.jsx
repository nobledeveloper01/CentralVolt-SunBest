import { Link } from 'react-router-dom'
import { ShoppingCart, ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import { formatPrice } from '../../data/products'
import useCartStore from '../../store/cartStore'

export default function ProductCard({ product }) {
  const addItem = useCartStore((s) => s.addItem)

  return (
    <div className="bg-surface-elevated rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col border border-border glow-card glow-top">
      <Link to={`/products/${product.slug}`} className="block overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-44 sm:h-52 md:h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <Link to={`/products/${product.slug}`}>
          <h3 className="text-base sm:text-lg font-bold text-text-primary mb-0.5 sm:mb-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-primary font-semibold mb-1.5 sm:mb-2">{product.tagline}</p>
        <p className="text-xs sm:text-sm text-text-secondary mb-3 sm:mb-4 flex-1 line-clamp-2">{product.shortDescription}</p>
        <div className="mb-3 sm:mb-4">
          <span className="text-xl sm:text-2xl font-bold text-text-primary">{formatPrice(product.price)}</span>
          <span className="text-[10px] sm:text-xs text-text-muted ml-1.5 sm:ml-2 block sm:inline mt-0.5 sm:mt-0">or deposit from {product.depositPercent}%</span>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => addItem(product)}
            className="flex-1 btn-gradient text-white py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 sm:gap-2"
          >
            <ShoppingCart size={14} className="sm:w-4 sm:h-4" />
            Add to Cart
          </motion.button>
          <Link
            to={`/products/${product.slug}`}
            className="p-2 sm:p-2.5 border-2 border-border hover:border-primary rounded-full text-text-muted hover:text-primary transition-colors flex items-center justify-center"
          >
            <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
          </Link>
        </div>
      </div>
    </div>
  )
}
