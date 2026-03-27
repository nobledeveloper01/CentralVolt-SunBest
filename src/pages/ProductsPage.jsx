import { useState } from 'react'
import { Home, Store, MessageCircle, Clock } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import ProductCard from '../components/products/ProductCard'
import { products } from '../data/products'

export default function ProductsPage() {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? products : products.filter((p) => p.category === filter)

  return (
    <>
      {/* Hero */}
      <section className="bg-secondary py-10 sm:py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
            Sun Best Solar Home Systems
          </h1>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Smart solar solutions for homes, shops, offices, and businesses — powering your TV, fan, lights, and phone charging.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-8 sm:py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Use-case filter */}
          <div className="flex justify-center gap-2 sm:gap-3 mb-6 sm:mb-10">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                filter === 'all' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => setFilter('home')}
              className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 sm:gap-2 ${
                filter === 'home' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Home size={14} className="sm:w-4 sm:h-4" /> Home
            </button>
            <button
              onClick={() => setFilter('business')}
              className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 sm:gap-2 ${
                filter === 'business' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Store size={14} className="sm:w-4 sm:h-4" /> Business
            </button>
          </div>

          {/* Business Coming Soon */}
          {filter === 'business' && (
            <div className="max-w-lg mx-auto text-center py-12 sm:py-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Clock size={32} className="sm:w-10 sm:h-10 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-charcoal mb-2 sm:mb-3">Business Solutions Coming Soon!</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                We're working on powerful solar solutions designed specifically for businesses — shops, stores, offices, and more. Be the first to know when they launch.
              </p>
              <a
                href="https://wa.me/2349067938522?text=Hello%2C%20I'm%20interested%20in%20Sun%20Best%20Solar%20Systems%20for%20my%20business.%20Please%20let%20me%20know%20when%20business%20packages%20are%20available."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 sm:px-8 sm:py-3.5 rounded-full text-sm sm:text-base font-semibold transition-colors w-full sm:w-auto"
              >
                <MessageCircle size={18} /> Chat With Us for Business Solutions
              </a>
              <p className="text-xs text-gray-400 mt-3">Tell us about your business needs and we'll create a custom solution.</p>
            </div>
          )}

          {/* What is SHS — only show when not filtering business */}
          {filter !== 'business' && (
            <>
              <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-charcoal mb-3 sm:mb-4">What the Sun Best SHS Series Is</h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                  The Sun Best SHS (Solar Home System) series is a DC solar power system designed to provide reliable electricity to Nigerian homes, shops, offices, and small businesses without depending on NEPA or fuel generators.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <p className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                    Light up your home or shop with bright, energy-saving bulbs.
                  </p>
                  <p className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                    Run your fan to stay cool during power outages.
                  </p>
                  <p className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                    Charge your phones and small devices safely.
                  </p>
                  <p className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                    Watch your DC-compatible TV anytime, even when there's no power.
                  </p>
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}
