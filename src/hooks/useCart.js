import { useCartStore } from "../store/cartStore";

export default function useCart() {
  const { items, addToCart, removeItem, clearCart } = useCartStore();

  const totalItems = items.length;

  return {
    items,
    totalItems,
    addToCart,
    removeItem,
    clearCart,
  };
}