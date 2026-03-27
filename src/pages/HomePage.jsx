import HeroSection from '../components/home/HeroSection'
import ProblemSolution from '../components/home/ProblemSolution'
import ProductHighlight from '../components/home/ProductHighlight'
import PaySmallSmall from '../components/home/PaySmallSmall'
import WhoItsFor from '../components/home/WhoItsFor'
import WhyChooseUs from '../components/home/WhyChooseUs'
import Testimonials from '../components/home/Testimonials'
import FinalCTA from '../components/home/FinalCTA'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSolution />
      <ProductHighlight />
      <PaySmallSmall />
      <WhoItsFor />
      <WhyChooseUs />
      <Testimonials />
      <FinalCTA />
    </>
  )
}
