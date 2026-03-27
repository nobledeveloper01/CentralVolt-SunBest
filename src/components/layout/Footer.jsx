import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Globe, MessageCircle, ExternalLink } from 'lucide-react'
import logo1 from '../../assets/logo1.jpeg'

const productLinks = [
  { to: '/products/sun-best-basic', label: 'Sun Best Basic' },
  { to: '/products/sun-best-plus-fan', label: 'Sun Best Plus (Fan)' },
  { to: '/products/sun-best-plus-tv', label: 'Sun Best Plus (TV)' },
  { to: '/products/sun-best-diamond', label: 'Sun Best Diamond' },
]

const companyLinks = [
  { to: '/about', label: 'About Us' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/pay-small-small', label: 'Pay Small Small' },
  { to: '/contact', label: 'Contact Us' },
]

const futureLinks = [
  'Solar Fans',
  'Solar Generators',
  'SME Power Bundles',
  'Distributor Program',
  'Bulk Purchase',
]

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <img src={logo1} alt="Centravolt Solar" className="h-12 w-auto mb-4" />
            <p className="text-gray-400 text-sm leading-relaxed">
              Smart solar solutions for homes, shops, offices, and businesses — powering your TV, fan, lights, and phone charging.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">Products</h4>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone size={16} className="text-primary shrink-0" />
                <a href="tel:09067938522" className="hover:text-white transition-colors">09067938522</a>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail size={16} className="text-primary shrink-0" />
                <a href="mailto:support@centravoltsolar.com.ng" className="hover:text-white transition-colors">
                  support@centravoltsolar.com.ng
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
                <span>Ikorodu, Lagos, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="border-t border-gray-700 mt-10 pt-8">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Coming Soon</h4>
          <div className="flex flex-wrap gap-2">
            {futureLinks.map((label) => (
              <span key={label} className="text-xs text-gray-500 bg-gray-800 px-3 py-1.5 rounded-full">
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Centravolt Solar Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://www.centravoltsolar.com.ng" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors" title="Visit our website"><Globe size={18} /></a>
            <a href="https://wa.me/2349067938522?text=Hello%2C%20I'm%20interested%20in%20Sun%20Best%20Solar%20Systems" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-500 transition-colors" title="Chat on WhatsApp"><MessageCircle size={18} /></a>
            <button onClick={() => { if (navigator.share) { navigator.share({ title: 'Centravolt Solar | Sun Best', text: 'Check out Sun Best Solar Home Systems — affordable solar for homes and businesses!', url: window.location.origin }) } else { navigator.clipboard.writeText(window.location.origin); alert('Link copied!') } }} className="text-gray-500 hover:text-primary transition-colors cursor-pointer" title="Share"><ExternalLink size={18} /></button>
          </div>
        </div>
      </div>
    </footer>
  )
}
