import { useState } from 'react'
import { Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react'
import Button from '../components/ui/Button'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = `Hello, my name is ${form.name}. ${form.message} \nPhone: ${form.phone}\nEmail: ${form.email}`
    window.open(`https://wa.me/2349067938522?text=${encodeURIComponent(text)}`, '_blank')
    setSubmitted(true)
  }

  const contactInfo = [
    { icon: Phone, label: 'Phone', value: '09067938522', href: 'tel:09067938522' },
    { icon: Mail, label: 'Email', value: 'support@centravoltsolar.com.ng', href: 'mailto:support@centravoltsolar.com.ng' },
    { icon: MapPin, label: 'Head Office', value: 'Ikorodu, Lagos', href: null },
    { icon: MapPin, label: 'Factory', value: 'Ikorodu, Lagos', href: null },
  ]

  return (
    <>
      <section className="bg-secondary py-10 sm:py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">Contact Us</h1>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Have questions? Need help choosing the right system? We're here to help.
          </p>
        </div>
      </section>

      <section className="py-8 sm:py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 md:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-charcoal mb-1.5 sm:mb-2">Request a Call</h2>
              <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">Fill in your details and we'll get back to you.</p>

              {submitted ? (
                <div className="text-center py-8 sm:py-10">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Send size={24} className="sm:w-7 sm:h-7 text-green-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-charcoal mb-2">Message Sent!</h3>
                  <p className="text-sm text-gray-500">We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-charcoal mb-1 sm:mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full border border-gray-300 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-charcoal mb-1 sm:mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="08012345678"
                      className="w-full border border-gray-300 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-charcoal mb-1 sm:mb-1.5">Email (optional)</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full border border-gray-300 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-charcoal mb-1 sm:mb-1.5">Message</label>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us what you need..."
                      className="w-full border border-gray-300 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-dark text-white py-3 sm:py-3.5 rounded-full text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <Send size={16} className="sm:w-[18px] sm:h-[18px]" /> Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-charcoal mb-4 sm:mb-6">Get in Touch</h2>

              <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                {contactInfo.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-xl">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <item.icon size={18} className="sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm sm:text-base font-semibold text-charcoal hover:text-primary transition-colors break-all">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm sm:text-base font-semibold text-charcoal">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-green-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <h3 className="text-sm sm:text-base font-bold text-charcoal mb-1.5 sm:mb-2">Prefer WhatsApp?</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Chat with us directly for quick responses.</p>
                <Button
                  href="https://wa.me/2349067938522?text=Hello%2C%20I%20need%20help%20with%20Sun%20Best%20solar%20systems"
                  variant="whatsapp"
                  className="w-full sm:w-auto"
                >
                  <MessageCircle size={18} /> Chat on WhatsApp
                </Button>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="mt-8 sm:mt-12">
            <h2 className="text-xl sm:text-2xl font-bold text-charcoal mb-4 sm:mb-6">Find Us</h2>
            <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200 h-64 sm:h-80 md:h-96">
              <iframe
                title="Centravolt Solar Location - Ikorodu, Lagos"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63427.530629898!2d3.4709!3d6.6194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bedf3a3b9f20b%3A0x6eaa8b630d2b06a1!2sIkorodu%2C%20Lagos!5e0!3m2!1sen!2sng!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
