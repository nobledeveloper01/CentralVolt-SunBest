import { ArrowRight, MessageCircle, CreditCard } from 'lucide-react'
import Button from '../ui/Button'
import heroImg from '../../assets/image2.jpeg'

export default function HeroSection() {
  return (
    <section className="relative bg-charcoal overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img src={heroImg} alt="Sun Best Solar in use" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/50 via-charcoal/30 to-charcoal/10" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 md:py-28 lg:py-36">
        <div className="max-w-2xl">
          <span className="inline-block bg-primary/20 text-primary px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
            Centravolt Solar | Sun Best
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6">
            Power Your Home & Business{' '}
            <span className="text-primary">Without Generator Stress</span>
          </h1>
          <p className="text-sm sm:text-base md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
            Affordable solar systems that let you enjoy light, TV, fan, and charging — with small-small payments.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3 mb-6 sm:mb-8">
            <Button to="/products" size="md" className="w-full sm:w-auto justify-center">
              Get Started <ArrowRight size={18} />
            </Button>
            <Button to="/pay-small-small" variant="outline" size="md" className="w-full sm:w-auto justify-center">
              <CreditCard size={18} /> Pay Small Small
            </Button>
            <Button
              href="https://wa.me/2349067938522?text=Hello%2C%20I'm%20interested%20in%20Sun%20Best%20Solar%20Systems"
              variant="whatsapp"
              size="md"
              className="w-full sm:w-auto justify-center"
            >
              <MessageCircle size={18} /> Chat on WhatsApp
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 sm:gap-x-6 sm:gap-y-2 text-xs sm:text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
              Installed across and outside Lagos
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
              Flexible payment
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
              Built for Nigerians
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
