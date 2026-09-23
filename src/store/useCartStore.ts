import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '../types'

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotals: () => { subtotal: number; totalItems: number };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id)
          
          if (existingItem) {
            // Check stock limit
            const newQuantity = Math.min(existingItem.quantity + quantity, product.stockQuantity)
            return {
              items: state.items.map((item) =>
                item.id === product.id ? { ...item, quantity: newQuantity } : item
              ),
            }
          }
          
          return { items: [...state.items, { ...product, quantity: Math.min(quantity, product.stockQuantity) }] }
        })
      },
      
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }))
      },
      
      updateQuantity: (productId, quantity) => {
        set((state) => {
          const item = state.items.find((i) => i.id === productId)
          if (!item) return state
          
          // Ensure quantity doesn't exceed stock and is at least 1
          const newQuantity = Math.max(1, Math.min(quantity, item.stockQuantity))
          
          return {
            items: state.items.map((i) =>
              i.id === productId ? { ...i, quantity: newQuantity } : i
            ),
          }
        })
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotals: () => {
        const { items } = get()
        return items.reduce(
          (totals, item) => {
            const priceToUse = item.salePrice || item.price
            return {
              subtotal: totals.subtotal + priceToUse * item.quantity,
              totalItems: totals.totalItems + item.quantity,
            }
          },
          { subtotal: 0, totalItems: 0 }
        )
      },
    }),
    {
      name: 'jude-equipment-cart',
    }
  )
)
