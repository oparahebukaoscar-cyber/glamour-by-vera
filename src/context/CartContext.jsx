import React, { createContext, useMemo } from 'react'
import { useCartStore } from '../store/cartStore'

export const CartContext = createContext({ cartItems: [], addToCart: () => {} })

export function CartProvider({ children }) {
  const items = useCartStore((s) => s.items)
  const addToCart = useCartStore((s) => s.addToCart)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const clearCart = useCartStore((s) => s.clearCart)
  const getTotal = useCartStore((s) => s.getTotal)
  const getItemCount = useCartStore((s) => s.getItemCount)

  const value = useMemo(
    () => ({
      cartItems: items,
      addToCart,
      removeItem,
      updateQuantity,
      clearCart,
      getTotal,
      getItemCount,
    }),
    [items, addToCart, removeItem, updateQuantity, clearCart, getTotal, getItemCount]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartContext
