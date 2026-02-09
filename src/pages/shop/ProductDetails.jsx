export default function ProductDetails() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-rose-400 min-h-screen">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        <img
          src="https://res.cloudinary.com/daekf2xyt/image/upload/v1769979787/Mulberry_Small_Bayswater_Double_Zip_Tote_1_650_xcj264.jpg"
          className="rounded-2xl object-cover bg-black/20 backdrop-blur-sm border border-rose-500/20"
        />

        <div>
          <h1 className="text-3xl text-rose-500 mb-4">Luxury Product</h1>
          <p className="text-rose-400 mb-6">
            Beautifully designed, premium quality, made to elevate your look.
          </p>

          <button className="rounded-full bg-rose-600 text-white px-4 py-2 text-sm hover:brightness-110 transition-all duration-200">
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}