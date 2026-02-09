import "./Shop.css";
import { useState, useEffect } from "react";
import { useCartStore } from "../../store/cartStore";
import { useNavigate } from "react-router-dom";
import { bags, shoes, sneakers } from "../../data/products";

// CSS-based stars rendered via .stars element and --rating custom property

export default function Shop() {
  const addToCart = useCartStore((s) => s.addToCart);
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("shop_seen");
    if (!seen) {
      setAnimateCards(true);
      sessionStorage.setItem("shop_seen", "1");
      // turn off after first paint
      setTimeout(() => setAnimateCards(false), 800);
    }
  }, []);

  function handleAdd(product, category) {
    // prepare minimal product object
    const p = {
      id: product.id,
      image: product.image,
      name: product.name,
      category,
    };
    addToCart(p);
    setToast("Item added to cart");
    setTimeout(() => setToast(null), 2000);
  }
  return (
    <section className="shop-page">
      <h1 className="section-title">Discover Our Collection</h1>
      <p className="section-sub">Luxury handbags crafted for timeless elegance.</p>

      <div className="product-grid">
        {bags.map((item) => (
          <div className={`product-card ${animateCards ? 'fade-in' : ''}`} key={item.id}>
            <div className="image-wrapper">
              <img src={item.image} alt="Luxury handbag" />
            </div>
            <div className="product-info">
              <div>
                <h3 className="product-name">{item.name}</h3>
                <div className={`stars rating-${Math.round(item.rating)}`} aria-label={`${item.rating} out of 5`} />
              </div>
              <div className="product-footer">
                <span className="price">{item.price}</span>
                <button className="add-to-cart" onClick={() => handleAdd(item, 'bags')}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h1 className="section-title spacing">Legwear Collection</h1>
      <p className="section-sub">
        Italian men’s shoes crafted with precision and heritage.
      </p>

      <div className="product-grid">
        {shoes.map((item) => (
          <div className={`product-card ${animateCards ? 'fade-in' : ''}`} key={item.id}>
            <div className="image-wrapper">
              <img src={item.image} alt="Italian men shoe" />
            </div>
            <div className="product-info">
              <div>
                <h3 className="product-name">{item.name}</h3>
                <div className={`stars rating-${Math.round(item.rating)}`} aria-label={`${item.rating} out of 5`} />
              </div>
              <div className="product-footer">
                <span className="price">{item.price}</span>
                <button className="add-to-cart" onClick={() => handleAdd(item, 'shoes')}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h1 className="section-title spacing">Sneakers Collection</h1>
      <p className="section-sub">A curated mix of premium streetwear sneakers — bold designs, iconic silhouettes, and everyday comfort.</p>

      <div className="product-grid">
        {sneakers.map((item) => (
          <div className={`product-card ${animateCards ? 'fade-in' : ''}`} key={item.id}>
            <div className="image-wrapper">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="product-info">
              <div>
                <h3 className="product-name">{item.name}</h3>
                <div className={`stars rating-${Math.round(item.rating)}`} aria-label={`${item.rating} out of 5`} />
              </div>
              <div className="product-footer">
                <span className="price">{item.price}</span>
                <button className="add-to-cart" onClick={() => handleAdd(item, 'sneakers')}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {toast && <div className="shop-toast">{toast}</div>}
    </section>
  );
}

