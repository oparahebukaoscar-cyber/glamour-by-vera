import React, { useEffect, useState } from "react";
import supabase from "../services/supabaseClient";
import { useCartStore } from "../store/cartStore";

export default function ShoppingPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const addToCart = useCartStore((s) => s.addToCart);

  async function fetchProducts() {
    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;
      setProducts(data || []);
    } catch (err) {
      console.error("Failed to load products", err);
      setError(err?.message || "Failed to load products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();

    // Realtime subscription: use single channel and clean up properly.
    // Avoid duplicate subscriptions in StrictMode by tracking on window.
    let channel = null;
    try {
      if (!window.__productsRealtimeSubscribed && supabase.channel) {
        window.__productsRealtimeSubscribed = true;
        channel = supabase
          .channel("products-realtime")
          .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "products" },
            () => fetchProducts()
          )
          .subscribe();
      }
    } catch (err) {
      console.warn("Realtime subscription failed", err);
    }

    return () => {
      try {
        if (channel && supabase.removeChannel) {
          supabase.removeChannel(channel);
        }
        window.__productsRealtimeSubscribed = false;
      } catch (e) {}
    };
  }, []);

  function renderStars(rating = 4) {
    const max = 5;
    const filled = Math.round(rating);
    return (
      <div className="flex gap-1 text-sm">
        {Array.from({ length: max }).map((_, i) => (
          <span key={i} className={i < filled ? "text-yellow-400" : "text-gray-400"}>
            {i < filled ? "★" : "☆"}
          </span>
        ))}
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Top intro */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-serif text-gray-900" style={{ letterSpacing: '0.6px' }}>
            Discover Our Products
          </h1>
          <p className="mt-3 text-lg text-gray-700 max-w-2xl mx-auto" style={{ color: '#6a584b' }}>
            Explore timeless pieces crafted for elegance and everyday style.
          </p>
        </header>

        {error && (
          <div className="mb-6 p-4 rounded border bg-red-50 border-red-200 text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-20 text-gray-600">Loading products…</div>
        ) : (
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((p) => (
                <article key={p.id} className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                  <div className="flex-1 flex items-center justify-center p-4">
                    <div className="w-full h-48 flex items-center justify-center" style={{ padding: 8 }}>
                      <img
                        src={p.image_url || "https://via.placeholder.com/600x400?text=No+Image"}
                        alt={p.name}
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => (e.target.src = "https://via.placeholder.com/600x400?text=No+Image")}
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <h3 className="text-base font-medium text-gray-900 truncate">{p.name}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <div>{renderStars(p.rating)}</div>
                      <div className="text-black font-bold text-lg">₦{parseFloat(p.price || 0).toFixed(2)}</div>
                    </div>

                    <div className="mt-4">
                      <button
                        onClick={() => addToCart({ id: p.id, name: p.name, price: Number(p.price || 0), image: p.image_url })}
                        className="w-full rounded-xl bg-[#CBB994] text-black py-2 px-3 font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
