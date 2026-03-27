import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingCart, CheckCircle, MessageCircle, CreditCard } from 'lucide-react'
import { getProductBySlug, formatPrice, products } from '../data/products'
import useCartStore from '../store/cartStore'
import Button from '../components/ui/Button'
import ProductCard from '../components/products/ProductCard'

export default function ProductDetailPage() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)
  const [selectedImage, setSelectedImage] = useState(0)
  const addItem = useCartStore((s) => s.addItem)

  if (!product) {
    return (
      <div className="py-16 sm:py-20 text-center px-4">
        <h1 className="text-xl sm:text-2xl font-bold text-charcoal mb-4">Product not found</h1>
        <Button to="/products">Browse Products</Button>
      </div>
    )
  }

  const related = products.filter((p) => p.id !== product.id).slice(0, 3)
  const monthlyPayment = Math.round((product.price - product.deposit) / 6)

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-primary shrink-0">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-primary shrink-0">Products</Link>
            <span>/</span>
            <span className="text-charcoal font-medium truncate">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-6 sm:py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16">
            {/* Images */}
            <div>
              <div className="bg-gray-50 rounded-xl sm:rounded-2xl overflow-hidden">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-56 sm:h-72 md:h-96 lg:h-[500px] object-cover transition-opacity duration-300"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImage === i
                          ? 'border-primary ring-2 ring-primary/30 scale-105'
                          : 'border-gray-200 hover:border-primary/50 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${i + 1}`}
                        className="w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <span className="inline-block bg-primary/10 text-primary px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-semibold mb-2 sm:mb-3">
                {product.tagline}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal mb-2 sm:mb-3">{product.name}</h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">{product.description}</p>

              {/* Pricing */}
              <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 mb-1">Full Price</p>
                    <p className="text-2xl sm:text-3xl font-bold text-charcoal">{formatPrice(product.price)}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 mb-1">Pay Small Small</p>
                    <p className="text-base sm:text-lg font-bold text-primary">{formatPrice(product.deposit)} deposit</p>
                    <p className="text-xs sm:text-sm text-gray-500">{formatPrice(monthlyPayment)}/month x 6</p>
                  </div>
                </div>
              </div>

              {/* What it powers */}
              <div className="mb-4 sm:mb-6">
                <h3 className="text-sm sm:text-base font-bold text-charcoal mb-2 sm:mb-3">What It Powers</h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {product.powers.map((p) => (
                    <span key={p} className="bg-primary/10 text-primary px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Why this product */}
              <div className="mb-4 sm:mb-6">
                <h3 className="text-sm sm:text-base font-bold text-charcoal mb-2 sm:mb-3">Why This Product</h3>
                <ul className="space-y-1.5 sm:space-y-2">
                  {product.whyThisProduct.map((reason) => (
                    <li key={reason} className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm">
                      <CheckCircle size={14} className="sm:w-4 sm:h-4 text-primary shrink-0" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              {/* What you get */}
              <div className="mb-5 sm:mb-8">
                <h3 className="text-sm sm:text-base font-bold text-charcoal mb-2 sm:mb-3">What You Get</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                  {product.whatYouGet.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm">
                      <CheckCircle size={14} className="sm:w-4 sm:h-4 text-green-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3">
                <button
                  onClick={() => addItem(product)}
                  className="w-full sm:flex-1 sm:min-w-[160px] bg-primary hover:bg-primary-dark text-white py-3 sm:py-3.5 rounded-full text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} /> Add to Cart
                </button>
                <Button to="/pay-small-small" variant="outline" className="w-full sm:w-auto justify-center">
                  <CreditCard size={18} /> Pay Small Small
                </Button>
                <Button
                  href={`https://wa.me/2349067938522?text=${encodeURIComponent(`Hello, I'm interested in the ${product.name}`)}`}
                  variant="whatsapp"
                  className="w-full sm:w-auto justify-center"
                >
                  <MessageCircle size={18} /> Talk to Expert
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-bold text-charcoal mb-6 sm:mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
