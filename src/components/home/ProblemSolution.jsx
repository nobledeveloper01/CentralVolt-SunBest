import { Volume2, Fuel, Sun } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'

const solutions = [
  { icon: Volume2, title: 'Silent Power', description: 'No generator noise — just clean, quiet electricity.' },
  { icon: Fuel, title: 'Zero Fuel Cost', description: 'Stop spending thousands on fuel every week.' },
  { icon: Sun, title: 'Reliable Daily Electricity', description: 'Works even when the main power grid is down.' },
]

export default function ProblemSolution() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Tired of Darkness, Fuel Costs, and Generator Wahala?"
          subtitle="Every day, Nigerians spend thousands on fuel, endure noise, and still don't have reliable electricity. Sun Best Solar Systems change everything."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {solutions.map((item) => (
            <div
              key={item.title}
              className="text-center p-5 sm:p-6 md:p-8 rounded-2xl bg-primary-lighter border border-primary/10 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5">
                <item.icon size={24} className="sm:w-7 sm:h-7 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-charcoal mb-2 sm:mb-3">{item.title}</h3>
              <p className="text-sm sm:text-base text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
