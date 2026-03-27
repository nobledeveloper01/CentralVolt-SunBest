import { ArrowRight, MessageCircle } from 'lucide-react'
import Button from '../ui/Button'

export default function FinalCTA() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
          Stop Managing Light.
          <br />
          Start Enjoying Power.
        </h2>
        <p className="text-white/80 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
          Join thousands of Nigerians already using Sun Best solar systems to power their homes and businesses.
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
          <Button to="/products" variant="white" size="md" className="w-full sm:w-auto justify-center">
            Get Started <ArrowRight size={18} />
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
      </div>
    </section>
  )
}
