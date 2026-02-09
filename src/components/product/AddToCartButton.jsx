import React from 'react';
import { useCartStore } from '../../store/cartStore';

const AddToCartButton = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleClick = () => {
    addToCart(product);
    // Optional: Show toast or feedback
    alert(`${product.title} added to cart!`);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full vintage-btn"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;