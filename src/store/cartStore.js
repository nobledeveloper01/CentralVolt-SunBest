import { create } from 'zustand'

const useCartStore = create((set, get) => ({
  items: [],
  paymentMethod: 'full', // 'full' or 'installment'
  installmentMonths: 6,

  addItem: (product) => {
    const items = get().items
    const existing = items.find((item) => item.id === product.id)
    if (existing) {
      set({
        items: items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      })
    } else {
      set({ items: [...items, { ...product, quantity: 1 }] })
    }
  },

  removeItem: (productId) => {
    set({ items: get().items.filter((item) => item.id !== productId) })
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId)
      return
    }
    set({
      items: get().items.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    })
  },

  setPaymentMethod: (method) => set({ paymentMethod: method }),
  setInstallmentMonths: (months) => set({ installmentMonths: months }),

  getSubtotal: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  },

  getTotalItems: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0)
  },

  getDeposit: () => {
    return Math.round(get().getSubtotal() * 0.3)
  },

  getMonthlyPayment: () => {
    const remaining = get().getSubtotal() - get().getDeposit()
    return Math.round(remaining / get().installmentMonths)
  },

  clearCart: () => set({ items: [] }),
}))

export default useCartStore
