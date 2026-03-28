import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ArrowRight,
  MessageCircle, ShieldCheck, Wrench, Headphones, Copy, CheckCheck,
  Landmark, User, Phone, Mail, MapPin, ClipboardList
} from 'lucide-react'
import useCartStore from '../store/cartStore'
import { formatPrice } from '../data/products'
import Button from '../components/ui/Button'
import AnimatedSection from '../components/ui/AnimatedSection'

const BANK_DETAILS = {
  bankName: 'GTBank (Guaranty Trust Bank)',
  accountName: 'Centravolt Solar Limited',
  accountNumber: '0123456789',
}

function generateOrderId() {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `CV-${timestamp}-${random}`
}

export default function CartPage() {
  const {
    items,
    paymentMethod,
    installmentMonths,
    updateQuantity,
    removeItem,
    setPaymentMethod,
    setInstallmentMonths,
    getSubtotal,
    getDeposit,
    getMonthlyPayment,
    clearCart,
  } = useCartStore()

  const [step, setStep] = useState('cart') // 'cart' | 'checkout' | 'confirmed' | 'whatsapp-form'
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
  })
  const [orderId, setOrderId] = useState('')
  const [copied, setCopied] = useState('')
  const [errors, setErrors] = useState({})

  const subtotal = getSubtotal()
  const deposit = getDeposit()
  const monthly = getMonthlyPayment()
  const amountDue = paymentMethod === 'full' ? subtotal : deposit

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const validatePhone = (phone) => {
    const cleaned = phone.replace(/\s|-/g, '')
    return /^(0[7-9][0-1]\d{8}|(\+?234)[7-9][0-1]\d{8})$/.test(cleaned)
  }

  const validateEmail = (email) => {
    if (!email) return true // optional
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validateFullName = (name) => {
    return name.trim().length >= 3 && /\s/.test(name.trim())
  }

  const validateForm = () => {
    const newErrors = {}

    if (!form.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    } else if (!validateFullName(form.fullName)) {
      newErrors.fullName = 'Enter your first and last name'
    }

    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!validatePhone(form.phone)) {
      newErrors.phone = 'Enter a valid Nigerian phone number (e.g. 08012345678)'
    }

    if (form.email && !validateEmail(form.email)) {
      newErrors.email = 'Enter a valid email address'
    }

    if (!form.address.trim()) {
      newErrors.address = 'Delivery address is required'
    } else if (form.address.trim().length < 10) {
      newErrors.address = 'Enter a more detailed address'
    }

    if (!form.state) {
      newErrors.state = 'Please select your state'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isFormValid = form.fullName && form.phone && form.address && form.state

  const buildWhatsAppMessage = (oid) => {
    const id = oid || orderId
    let msg = `*NEW ORDER — ${id}*\n`
    msg += `━━━━━━━━━━━━━━━━━━\n\n`
    msg += `*Customer Details*\n`
    msg += `Name: ${form.fullName}\n`
    msg += `Phone: ${form.phone}\n`
    if (form.email) msg += `Email: ${form.email}\n`
    msg += `Address: ${form.address}\n`
    msg += `City: ${form.city || 'N/A'}\n`
    msg += `State: ${form.state}\n\n`
    msg += `*Order Items*\n`
    items.forEach((item, i) => {
      msg += `${i + 1}. ${item.name} x ${item.quantity} = ${formatPrice(item.price * item.quantity)}\n`
    })
    msg += `\n`
    msg += `*Payment Configuration*\n`
    msg += `Subtotal: ${formatPrice(subtotal)}\n`
    msg += `Installation: Included\n`
    if (paymentMethod === 'full') {
      msg += `Payment Plan: Full Payment\n`
      msg += `Amount Due: ${formatPrice(subtotal)}\n`
    } else {
      msg += `Payment Plan: Pay Small Small (Installment)\n`
      msg += `Duration: ${installmentMonths} months\n`
      msg += `Deposit (30%): ${formatPrice(deposit)}\n`
      msg += `Monthly Payment: ${formatPrice(monthly)} x ${installmentMonths} months\n`
      msg += `Amount Due Now (Deposit): ${formatPrice(deposit)}\n`
    }
    msg += `\n*Bank Details for Payment*\n`
    msg += `Bank: ${BANK_DETAILS.bankName}\n`
    msg += `Account Name: ${BANK_DETAILS.accountName}\n`
    msg += `Account Number: ${BANK_DETAILS.accountNumber}\n\n`
    msg += `*Order ID: ${id}*\n`
    msg += `Please use this Order ID as your transfer reference.\n\n`
    msg += `I would like to confirm this order. Thank you!`
    return msg
  }

  const handleProceedToCheckout = () => {
    setStep('checkout')
    window.scrollTo(0, 0)
  }

  const handleConfirmOrder = () => {
    if (!validateForm()) return
    const oid = generateOrderId()
    setOrderId(oid)
    setStep('confirmed')
    window.scrollTo(0, 0)
  }

  const handleSendToWhatsApp = () => {
    const msg = buildWhatsAppMessage(orderId)
    window.open(`https://wa.me/2349067938522?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(''), 2000)
  }

  // Empty cart
  if (items.length === 0 && step !== 'confirmed') {
    return (
      <section className="py-14 sm:py-20 md:py-32 transition-colors duration-300">
        <div className="max-w-lg mx-auto px-4 text-center">
          <ShoppingBag size={48} className="sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4 sm:mb-6" />
          <h1 className="text-xl sm:text-2xl font-bold text-text-primary mb-2 sm:mb-3">Your cart is empty</h1>
          <p className="text-sm sm:text-base text-text-secondary mb-6 sm:mb-8">Browse our solar systems and find the perfect one for you.</p>
          <Button to="/products" size="md" className="w-full sm:w-auto">Browse Products</Button>
        </div>
      </section>
    )
  }

  // STEP 3: Order Confirmed
  if (step === 'confirmed') {
    return (
      <>
        <section className="bg-green-50 dark:bg-green-900/20 border-b">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-center">
            <AnimatedSection>
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <CheckCheck size={24} className="sm:w-8 sm:h-8 text-green-600" />
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary mb-1.5 sm:mb-2">Order Created Successfully!</h1>
              <p className="text-sm sm:text-base text-text-secondary">Please complete your payment and send confirmation via WhatsApp.</p>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-6 sm:py-8 md:py-12 transition-colors duration-300">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
            {/* Order ID */}
            <div className="bg-primary-lighter border-2 border-primary rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center">
              <p className="text-xs sm:text-sm text-text-secondary mb-1">Your Order ID</p>
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary tracking-wider break-all">{orderId}</span>
                <button
                  onClick={() => copyToClipboard(orderId, 'orderId')}
                  className="p-1.5 sm:p-2 hover:bg-primary/10 rounded-lg transition-colors shrink-0"
                >
                  {copied === 'orderId' ? <CheckCheck size={16} className="text-green-600" /> : <Copy size={16} className="text-text-secondary" />}
                </button>
              </div>
              <p className="text-[10px] sm:text-xs text-text-secondary mt-1.5 sm:mt-2">Use this as your transfer reference/narration</p>
            </div>

            {/* Bank Details */}
            <div className="bg-surface-elevated rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-text-primary mb-3 sm:mb-4 flex items-center gap-2">
                <Landmark size={18} className="sm:w-5 sm:h-5 text-primary" />
                Bank Payment Details
              </h3>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 space-y-2">
                <p className="text-xs sm:text-sm text-yellow-800 dark:text-yellow-200 font-semibold">
                  IMPORTANT: Use Order ID ({orderId}) as transfer reference.
                </p>
                <p className="text-xs sm:text-sm text-yellow-800 dark:text-yellow-200 font-semibold">
                  Before making any transfer, please confirm that the Account Name displayed on your bank app matches "{BANK_DETAILS.accountName}" — the same name as our company. Do NOT send money if the name does not match.
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {[
                  { label: 'Bank Name', value: BANK_DETAILS.bankName, key: 'bank' },
                  { label: 'Account Name', value: BANK_DETAILS.accountName, key: 'accName' },
                  { label: 'Account Number', value: BANK_DETAILS.accountNumber, key: 'accNum', bold: true },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-3 sm:p-4 bg-surface-alt rounded-lg sm:rounded-xl">
                    <div className="min-w-0 mr-2">
                      <p className="text-[10px] sm:text-xs text-text-secondary">{item.label}</p>
                      <p className={`${item.bold ? 'text-base sm:text-xl font-bold tracking-wider' : 'text-sm sm:text-base font-semibold'} text-text-primary break-all`}>{item.value}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(item.value, item.key)}
                      className="p-1.5 sm:p-2 hover:bg-surface-alt rounded-lg transition-colors shrink-0"
                    >
                      {copied === item.key ? <CheckCheck size={14} className="text-green-600" /> : <Copy size={14} className="text-text-muted" />}
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-primary-lighter rounded-lg sm:rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-text-secondary">Amount to Pay Now</span>
                  <span className="text-lg sm:text-xl font-bold text-primary">{formatPrice(amountDue)}</span>
                </div>
                {paymentMethod === 'installment' && (
                  <p className="text-[10px] sm:text-xs text-text-secondary text-right mt-1">
                    Deposit (30%) — then {formatPrice(monthly)}/month x {installmentMonths} months
                  </p>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-surface rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-text-primary mb-3 sm:mb-4 flex items-center gap-2">
                <ClipboardList size={18} className="sm:w-5 sm:h-5 text-primary" />
                Order Summary
              </h3>
              <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-text-secondary truncate mr-2">{item.name} x {item.quantity}</span>
                    <span className="font-semibold shrink-0">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 sm:pt-3 flex justify-between text-sm">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">{formatPrice(subtotal)}</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm text-text-secondary space-y-0.5 sm:space-y-1">
                <p><strong>Customer:</strong> {form.fullName}</p>
                <p><strong>Phone:</strong> {form.phone}</p>
                {form.email && <p><strong>Email:</strong> {form.email}</p>}
                <p><strong>Address:</strong> {form.address}, {form.city}, {form.state}</p>
                {paymentMethod === 'full' ? (
                  <p><strong>Payment:</strong> Full Payment — {formatPrice(subtotal)}</p>
                ) : (
                  <>
                    <p><strong>Payment:</strong> Pay Small Small ({installmentMonths} months)</p>
                    <p><strong>Deposit (30%):</strong> {formatPrice(deposit)}</p>
                    <p><strong>Monthly:</strong> {formatPrice(monthly)}/month x {installmentMonths} months</p>
                  </>
                )}
              </div>
            </div>

            {/* WhatsApp Send */}
            <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center">
              <h3 className="text-base sm:text-lg font-bold text-text-primary mb-1.5 sm:mb-2">Final Step: Confirm on WhatsApp</h3>
              <p className="text-xs sm:text-sm text-text-secondary mb-3 sm:mb-4">
                Send your order details to our team on WhatsApp for confirmation.
              </p>
              <button
                onClick={handleSendToWhatsApp}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 sm:py-4 rounded-full font-semibold transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <MessageCircle size={18} className="sm:w-[22px] sm:h-[22px]" /> Send Order to WhatsApp
              </button>
              <p className="text-[10px] sm:text-xs text-text-secondary mt-2 sm:mt-3">
                This will open WhatsApp with your full order details pre-filled.
              </p>
            </div>

            <div className="text-center pb-4">
              <Link to="/products" className="text-xs sm:text-sm text-primary hover:underline">
                Continue Shopping
              </Link>
            </div>
          </div>
        </section>
      </>
    )
  }

  // STEP 2: Checkout — Biodata
  if (step === 'checkout') {
    return (
      <>
        <section className="bg-surface-alt border-b border-border transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8">
            <button onClick={() => setStep('cart')} className="text-xs sm:text-sm text-text-secondary hover:text-primary flex items-center gap-1 mb-2 sm:mb-3">
              <ArrowLeft size={14} className="sm:w-4 sm:h-4" /> Back to Cart
            </button>
            <AnimatedSection>
              <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Checkout</h1>
              <p className="text-sm text-text-secondary mt-0.5 sm:mt-1">Enter your details to complete the order</p>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-6 sm:py-8 md:py-12 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Biodata Form */}
              <div className="lg:col-span-2">
                <div className="bg-surface rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 md:p-8">
                  <h2 className="text-lg sm:text-xl font-bold text-text-primary mb-4 sm:mb-6 flex items-center gap-2">
                    <User size={18} className="sm:w-5 sm:h-5 text-primary" />
                    Your Details
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs sm:text-sm font-semibold text-text-primary mb-1 sm:mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User size={14} className="sm:w-4 sm:h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                        <input
                          type="text"
                          value={form.fullName}
                          onChange={(e) => updateForm('fullName', e.target.value)}
                          placeholder="Enter your first and last name"
                          className={`w-full border rounded-lg sm:rounded-xl pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 ${errors.fullName ? 'border-red-400 focus:ring-red-300' : 'border-border focus:ring-primary/50'}`}
                        />
                      </div>
                      {errors.fullName && <p className="text-red-500 text-[10px] sm:text-xs mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-text-primary mb-1 sm:mb-1.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone size={14} className="sm:w-4 sm:h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => updateForm('phone', e.target.value)}
                          placeholder="08012345678"
                          className={`w-full border rounded-lg sm:rounded-xl pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 ${errors.phone ? 'border-red-400 focus:ring-red-300' : 'border-border focus:ring-primary/50'}`}
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-[10px] sm:text-xs mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-text-primary mb-1 sm:mb-1.5">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail size={14} className="sm:w-4 sm:h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => updateForm('email', e.target.value)}
                          placeholder="your@email.com (optional)"
                          className={`w-full border rounded-lg sm:rounded-xl pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 ${errors.email ? 'border-red-400 focus:ring-red-300' : 'border-border focus:ring-primary/50'}`}
                        />
                      </div>
                      {errors.email && <p className="text-red-500 text-[10px] sm:text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs sm:text-sm font-semibold text-text-primary mb-1 sm:mb-1.5">
                        Delivery Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MapPin size={14} className="sm:w-4 sm:h-4 absolute left-3 top-3 text-text-muted" />
                        <textarea
                          rows={2}
                          value={form.address}
                          onChange={(e) => updateForm('address', e.target.value)}
                          placeholder="Enter your full street address"
                          className={`w-full border rounded-lg sm:rounded-xl pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 resize-none ${errors.address ? 'border-red-400 focus:ring-red-300' : 'border-border focus:ring-primary/50'}`}
                        />
                      </div>
                      {errors.address && <p className="text-red-500 text-[10px] sm:text-xs mt-1">{errors.address}</p>}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-text-primary mb-1 sm:mb-1.5">City</label>
                      <input
                        type="text"
                        value={form.city}
                        onChange={(e) => updateForm('city', e.target.value)}
                        placeholder="e.g. Ikorodu"
                        className="w-full border border-border rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-text-primary mb-1 sm:mb-1.5">
                        State <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={form.state}
                        onChange={(e) => updateForm('state', e.target.value)}
                        className={`w-full border rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 ${errors.state ? 'border-red-400 focus:ring-red-300' : 'border-border focus:ring-primary/50'}`}
                      >
                        <option value="">Select state</option>
                        {['Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT','Gombe','Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara'].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {errors.state && <p className="text-red-500 text-[10px] sm:text-xs mt-1">{errors.state}</p>}
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8">
                    <button
                      onClick={handleConfirmOrder}
                      disabled={!isFormValid}
                      className={`w-full py-3 sm:py-4 rounded-full font-semibold transition-all flex items-center justify-center gap-2 text-sm sm:text-base ${
                        isFormValid
                          ? 'bg-primary hover:bg-primary-dark text-white'
                          : 'bg-surface-alt text-text-muted cursor-not-allowed'
                      }`}
                    >
                      Confirm Order <ArrowRight size={18} />
                    </button>
                    <p className="text-[10px] sm:text-xs text-text-muted text-center mt-1.5 sm:mt-2">
                      You will be shown bank details and a WhatsApp confirmation button next.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-surface rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-bold text-text-primary mb-3 sm:mb-4">Order Review</h3>
                  <div className="space-y-2.5 sm:space-y-3 mb-3 sm:mb-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-2.5 sm:gap-3">
                        <img src={item.image} alt={item.name} className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-lg shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-semibold text-text-primary truncate">{item.name}</p>
                          <p className="text-[10px] sm:text-xs text-text-secondary">Qty: {item.quantity}</p>
                          <p className="text-xs sm:text-sm font-bold">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-2.5 sm:pt-3 space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Subtotal</span>
                      <span className="font-semibold">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Installation</span>
                      <span className="text-green-600 font-semibold">Included</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Payment</span>
                      <span className="font-semibold">
                        {paymentMethod === 'full' ? 'Full Payment' : `Installment (${installmentMonths}mo)`}
                      </span>
                    </div>
                    {paymentMethod === 'installment' && (
                      <>
                        <div className="flex justify-between text-primary">
                          <span>Deposit (30%)</span>
                          <span className="font-semibold">{formatPrice(deposit)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Monthly</span>
                          <span className="font-semibold">{formatPrice(monthly)}/mo</span>
                        </div>
                      </>
                    )}
                    <div className="border-t pt-2.5 sm:pt-3 flex justify-between">
                      <span className="font-bold text-text-primary">Due Now</span>
                      <span className="font-bold text-lg sm:text-xl text-primary">{formatPrice(amountDue)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-alt rounded-xl sm:rounded-2xl p-4 sm:p-5 space-y-2.5 sm:space-y-3">
                  <div className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-text-secondary">
                    <ShieldCheck size={16} className="sm:w-4.5 sm:h-4.5 text-primary shrink-0" />
                    Secure Payment
                  </div>
                  <div className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-text-secondary">
                    <Wrench size={16} className="sm:w-4.5 sm:h-4.5 text-primary shrink-0" />
                    Installation Included
                  </div>
                  <div className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-text-secondary">
                    <Headphones size={16} className="sm:w-4.5 sm:h-4.5 text-primary shrink-0" />
                    Customer Support Available
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }

  // STEP: WhatsApp order form — collect biodata then send inquiry to WhatsApp (no payment)
  if (step === 'whatsapp-form') {
    const handleSendWhatsAppInquiry = () => {
      if (!validateForm()) return
      let msg = `Hello Centravolt Solar!\n\n`
      msg += `I'd like to place an order.\n\n`
      msg += `*My Details*\n`
      msg += `Name: ${form.fullName}\n`
      msg += `Phone: ${form.phone}\n`
      if (form.email) msg += `Email: ${form.email}\n`
      msg += `Address: ${form.address}\n`
      if (form.city) msg += `City: ${form.city}\n`
      msg += `State: ${form.state}\n\n`
      msg += `*Order Items*\n`
      items.forEach((item, i) => {
        msg += `${i + 1}. ${item.name} x ${item.quantity} = ${formatPrice(item.price * item.quantity)}\n`
      })
      msg += `\n*Payment Details*\n`
      msg += `Subtotal: ${formatPrice(subtotal)}\n`
      if (paymentMethod === 'full') {
        msg += `Payment Plan: Full Payment\n`
        msg += `Amount: ${formatPrice(subtotal)}\n\n`
      } else {
        msg += `Payment Plan: Pay Small Small (Installment)\n`
        msg += `Deposit (30%): ${formatPrice(deposit)}\n`
        msg += `Monthly Payment: ${formatPrice(monthly)} x ${installmentMonths} months\n`
        msg += `Total: ${formatPrice(subtotal)}\n\n`
      }
      msg += `Please confirm availability and next steps. Thank you!`
      window.open(`https://wa.me/2349067938522?text=${encodeURIComponent(msg)}`, '_blank')
    }

    return (
      <>
        <section className="bg-surface-alt border-b border-border transition-colors duration-300">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8">
            <button onClick={() => setStep('cart')} className="text-xs sm:text-sm text-text-secondary hover:text-primary flex items-center gap-1 mb-2 sm:mb-3">
              <ArrowLeft size={14} className="sm:w-4 sm:h-4" /> Back to Cart
            </button>
            <AnimatedSection>
              <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Order via WhatsApp</h1>
              <p className="text-sm text-text-secondary mt-0.5 sm:mt-1">Enter your details so we can process your order</p>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-6 sm:py-8 md:py-12 transition-colors duration-300">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-surface rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 md:p-8">
              <h2 className="text-lg sm:text-xl font-bold text-text-primary mb-4 sm:mb-6 flex items-center gap-2">
                <User size={18} className="sm:w-5 sm:h-5 text-primary" />
                Your Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs sm:text-sm font-semibold text-text-primary mb-1 sm:mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User size={14} className="sm:w-4 sm:h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={(e) => updateForm('fullName', e.target.value)}
                      placeholder="Enter your first and last name"
                      className={`w-full border rounded-lg sm:rounded-xl pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 ${errors.fullName ? 'border-red-400 focus:ring-red-300' : 'border-border focus:ring-primary/50'}`}
                    />
                  </div>
                  {errors.fullName && <p className="text-red-500 text-[10px] sm:text-xs mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-text-primary mb-1 sm:mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={14} className="sm:w-4 sm:h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateForm('phone', e.target.value)}
                      placeholder="08012345678"
                      className={`w-full border rounded-lg sm:rounded-xl pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 ${errors.phone ? 'border-red-400 focus:ring-red-300' : 'border-border focus:ring-primary/50'}`}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-[10px] sm:text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-text-primary mb-1 sm:mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={14} className="sm:w-4 sm:h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => updateForm('email', e.target.value)}
                      placeholder="your@email.com (optional)"
                      className={`w-full border rounded-lg sm:rounded-xl pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 ${errors.email ? 'border-red-400 focus:ring-red-300' : 'border-border focus:ring-primary/50'}`}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-[10px] sm:text-xs mt-1">{errors.email}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs sm:text-sm font-semibold text-text-primary mb-1 sm:mb-1.5">
                    Delivery Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin size={14} className="sm:w-4 sm:h-4 absolute left-3 top-3 text-text-muted" />
                    <textarea
                      rows={2}
                      value={form.address}
                      onChange={(e) => updateForm('address', e.target.value)}
                      placeholder="Enter your full street address"
                      className={`w-full border rounded-lg sm:rounded-xl pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 resize-none ${errors.address ? 'border-red-400 focus:ring-red-300' : 'border-border focus:ring-primary/50'}`}
                    />
                  </div>
                  {errors.address && <p className="text-red-500 text-[10px] sm:text-xs mt-1">{errors.address}</p>}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-text-primary mb-1 sm:mb-1.5">City</label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => updateForm('city', e.target.value)}
                    placeholder="e.g. Ikorodu"
                    className="w-full border border-border rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-text-primary mb-1 sm:mb-1.5">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.state}
                    onChange={(e) => updateForm('state', e.target.value)}
                    className={`w-full border rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 ${errors.state ? 'border-red-400 focus:ring-red-300' : 'border-border focus:ring-primary/50'}`}
                  >
                    <option value="">Select state</option>
                    {['Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT','Gombe','Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara'].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.state && <p className="text-red-500 text-[10px] sm:text-xs mt-1">{errors.state}</p>}
                </div>
              </div>

              {/* Order summary inline */}
              <div className="mt-6 sm:mt-8 bg-surface-alt rounded-lg sm:rounded-xl p-4 sm:p-5">
                <h3 className="text-sm sm:text-base font-bold text-text-primary mb-3">Your Order</h3>
                <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm mb-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span className="text-text-secondary truncate mr-2">{item.name} x {item.quantity}</span>
                      <span className="font-semibold shrink-0">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">{formatPrice(subtotal)}</span>
                  </div>
                </div>
                {paymentMethod === 'full' ? (
                  <p className="text-[10px] sm:text-xs text-text-secondary">Payment: Full Payment — {formatPrice(subtotal)}</p>
                ) : (
                  <div className="text-[10px] sm:text-xs text-text-secondary space-y-0.5">
                    <p>Payment: Pay Small Small ({installmentMonths} months)</p>
                    <p>Deposit (30%): <span className="font-semibold text-text-primary">{formatPrice(deposit)}</span></p>
                    <p>Monthly: <span className="font-semibold text-text-primary">{formatPrice(monthly)}/month</span></p>
                  </div>
                )}
              </div>

              <div className="mt-6 sm:mt-8">
                <button
                  onClick={handleSendWhatsAppInquiry}
                  className="w-full py-3 sm:py-4 rounded-full font-semibold transition-all flex items-center justify-center gap-2 text-sm sm:text-base bg-green-500 hover:bg-green-600 text-white"
                >
                  <MessageCircle size={18} /> Send Order to WhatsApp
                </button>
                <p className="text-[10px] sm:text-xs text-text-muted text-center mt-1.5 sm:mt-2">
                  Your details and order will be sent to our team. They will contact you to confirm and arrange delivery.
                </p>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }

  // STEP 1: Cart
  return (
    <>
      <section className="bg-surface-alt border-b border-border transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8">
          <AnimatedSection>
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Your Cart</h1>
            <p className="text-sm text-text-secondary mt-0.5 sm:mt-1">Review your selected products and complete your order</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-6 sm:py-8 md:py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-surface rounded-xl sm:rounded-2xl border border-border p-3 sm:p-4 md:p-6 flex gap-3 sm:gap-4 md:gap-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-cover rounded-lg sm:rounded-xl shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1.5 sm:gap-2">
                      <div className="min-w-0">
                        <h3 className="text-sm sm:text-base font-bold text-text-primary truncate">{item.name}</h3>
                        <p className="text-xs sm:text-sm text-text-secondary mt-0.5 line-clamp-1 hidden sm:block">{item.shortDescription}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 sm:p-2 text-text-muted hover:text-red-500 transition-colors shrink-0"
                      >
                        <Trash2 size={16} className="sm:w-4.5 sm:h-4.5" />
                      </button>
                    </div>

                    <div className="flex items-end justify-between mt-2.5 sm:mt-4">
                      <div className="flex items-center gap-0.5 sm:gap-1 bg-surface-alt rounded-full">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-surface-alt transition-colors"
                        >
                          <Minus size={12} className="sm:w-3.5 sm:h-3.5" />
                        </button>
                        <span className="w-6 sm:w-8 text-center text-xs sm:text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-surface-alt transition-colors"
                        >
                          <Plus size={12} className="sm:w-3.5 sm:h-3.5" />
                        </button>
                      </div>
                      <p className="text-sm sm:text-lg font-bold text-text-primary">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex gap-3 pt-1 sm:pt-2">
                <Link to="/products" className="text-xs sm:text-sm text-text-secondary hover:text-primary flex items-center gap-1 transition-colors">
                  <ArrowLeft size={14} className="sm:w-4 sm:h-4" /> Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-surface rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-text-primary mb-3 sm:mb-4">Order Summary</h3>

                <div className="space-y-2.5 sm:space-y-3 mb-4 sm:mb-6">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-text-secondary">Subtotal</span>
                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-text-secondary">Installation</span>
                    <span className="text-green-600 font-semibold">Included</span>
                  </div>
                  <div className="border-t pt-2.5 sm:pt-3 flex justify-between">
                    <span className="text-sm sm:text-base font-bold text-text-primary">Total</span>
                    <span className="text-lg sm:text-xl font-bold text-text-primary">{formatPrice(subtotal)}</span>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-4 sm:mb-6">
                  <h4 className="text-xs sm:text-sm font-semibold text-text-primary mb-2 sm:mb-3">Payment Option</h4>
                  <div className="space-y-2">
                    <label className={`flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-lg sm:rounded-xl border-2 cursor-pointer transition-colors ${paymentMethod === 'full' ? 'border-primary bg-primary-lighter' : 'border-border'}`}>
                      <input type="radio" name="payment" checked={paymentMethod === 'full'} onChange={() => setPaymentMethod('full')} className="accent-primary" />
                      <div>
                        <p className="text-xs sm:text-sm font-semibold">Full Payment</p>
                        <p className="text-[10px] sm:text-xs text-text-secondary">Pay {formatPrice(subtotal)} now</p>
                      </div>
                    </label>
                    <label className={`flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-lg sm:rounded-xl border-2 cursor-pointer transition-colors ${paymentMethod === 'installment' ? 'border-primary bg-primary-lighter' : 'border-border'}`}>
                      <input type="radio" name="payment" checked={paymentMethod === 'installment'} onChange={() => setPaymentMethod('installment')} className="accent-primary" />
                      <div>
                        <p className="text-xs sm:text-sm font-semibold">Pay Small Small</p>
                        <p className="text-[10px] sm:text-xs text-text-secondary">Deposit + monthly payments</p>
                      </div>
                    </label>
                  </div>
                </div>

                {paymentMethod === 'installment' && (
                  <div className="bg-surface-alt rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                    <h4 className="text-xs sm:text-sm font-semibold text-text-primary mb-2 sm:mb-3">Payment Breakdown</h4>
                    <div className="mb-2 sm:mb-3">
                      <label className="text-[10px] sm:text-xs text-text-secondary mb-1 block">Duration</label>
                      <select
                        value={installmentMonths}
                        onChange={(e) => setInstallmentMonths(Number(e.target.value))}
                        className="w-full border border-border rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        <option value={3}>3 months</option>
                        <option value={6}>6 months</option>
                        <option value={9}>9 months</option>
                        <option value={12}>12 months</option>
                      </select>
                    </div>
                    <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Deposit (30%)</span>
                        <span className="font-semibold">{formatPrice(deposit)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Monthly x {installmentMonths}</span>
                        <span className="font-semibold">{formatPrice(monthly)}</span>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleProceedToCheckout}
                  className="w-full bg-primary hover:bg-primary-dark text-white py-3 sm:py-3.5 rounded-full text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  Proceed to Checkout <ArrowRight size={16} className="sm:w-4.5 sm:h-4.5" />
                </button>

                <button
                  onClick={() => { setStep('whatsapp-form'); window.scrollTo(0, 0) }}
                  className="w-full mt-2.5 sm:mt-3 bg-green-500 hover:bg-green-600 text-white py-3 sm:py-3.5 rounded-full text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle size={14} className="sm:w-4 sm:h-4" /> Order via WhatsApp
                </button>
              </div>

              <div className="bg-surface-alt rounded-xl sm:rounded-2xl p-4 sm:p-5 space-y-2.5 sm:space-y-3">
                <div className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-text-secondary">
                  <ShieldCheck size={16} className="sm:w-4.5 sm:h-4.5 text-primary shrink-0" />
                  Secure Payment
                </div>
                <div className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-text-secondary">
                  <Wrench size={16} className="sm:w-4.5 sm:h-4.5 text-primary shrink-0" />
                  Installation Included
                </div>
                <div className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-text-secondary">
                  <Headphones size={16} className="sm:w-4.5 sm:h-4.5 text-primary shrink-0" />
                  Customer Support Available
                </div>
              </div>

              <p className="text-[10px] sm:text-xs text-text-muted text-center">
                Need help choosing? Chat with our expert to guide you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
