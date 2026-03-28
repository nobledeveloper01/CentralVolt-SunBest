import { ArrowRight, MessageCircle, CreditCard } from 'lucide-react'
import { motion } from 'motion/react' // eslint-disable-line
import Button from '../ui/Button'
import heroImg from '../../assets/image2.jpeg'

export default function HeroSection() {
  return (
    <section className="relative bg-[#1A1A2E] overflow-hidden starfield">
      {/* Background image with Ken Burns */}
      <div className="absolute inset-0">
        <img src={heroImg} alt="Sun Best Solar in use" className="w-full h-full object-cover opacity-50 animate-kenburns" />
        <div className="absolute inset-0 bg-linear-to-r from-[#1A1A2E]/70 via-[#1A1A2E]/40 to-[#1A1A2E]/20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 md:py-28 lg:py-36">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-primary/20 text-primary px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6"
          >
            Centravolt Solar | Sun Best
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6"
          >
            Power Your Home & Business{' '}
            <span className="text-gradient">Without Generator Stress</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed"
          >
            Affordable solar systems that let you enjoy light, TV, fan, and charging — with small-small payments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3 mb-6 sm:mb-8"
          >
            <Button to="/products" size="md" className="w-full sm:w-auto justify-center btn-gradient">
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 sm:gap-x-6 sm:gap-y-2 text-xs sm:text-sm text-gray-400"
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  )
}
