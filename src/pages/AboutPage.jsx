import { CheckCircle, MapPin, ArrowRight } from 'lucide-react'
import Button from '../components/ui/Button'
import image2 from '../assets/image2.jpeg'

const values = [
  'Work with your lifestyle',
  'Fit your budget',
  'Deliver consistent performance',
]

export default function AboutPage() {
  return (
    <>
      <section className="bg-secondary py-10 sm:py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
            Powering Nigeria, One Home at a Time
          </h1>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Centravolt Solar Limited is committed to making electricity affordable and reliable for Nigerians.
          </p>
        </div>
      </section>

      <section className="py-8 sm:py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <img src={image2} alt="Sun Best in action" className="rounded-xl sm:rounded-2xl shadow-lg w-full h-52 sm:h-64 md:h-80 lg:h-100 object-cover" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-charcoal mb-3 sm:mb-4">Our Mission</h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
                Centravolt Solar Limited is committed to making electricity affordable and reliable for Nigerians. We design solar systems that work for everyday people — from homes in Ikorodu to shops across Lagos and beyond.
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
                We believe every Nigerian deserves access to clean, reliable power. Our Sun Best Solar Home Systems are designed specifically for the Nigerian context — no generator noise, no fuel costs, just consistent electricity from the sun.
              </p>

              <h3 className="text-sm sm:text-base font-bold text-charcoal mb-2 sm:mb-3">We design solar systems that:</h3>
              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                {values.map((v) => (
                  <li key={v} className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-gray-600">
                    <CheckCircle size={16} className="sm:w-[18px] sm:h-[18px] text-primary shrink-0" />
                    {v}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2 text-gray-500 text-sm mb-4 sm:mb-6">
                <MapPin size={16} className="sm:w-[18px] sm:h-[18px] text-primary" />
                <span>Head Office & Factory: Ikorodu, Lagos</span>
              </div>

              <Button to="/contact" className="w-full sm:w-auto">
                Contact Us <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
