import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }) {
  return (
    <div className="vintage-card">
      <div className="h-56 flex items-center justify-center p-4">
        <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
      </div>
      <div className="p-4 text-deepBrown">
        <h3 className="text-lg font-medium">{product.name}</h3>
        <p className="text-black font-bold mt-1">₦{product.price}</p>
        <div className="mt-3">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}