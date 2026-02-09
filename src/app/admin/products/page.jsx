import { useEffect, useState } from "react";
import supabase from "../../../services/supabaseClient";
import AdminSidebar from "../../../components/AdminSidebar";
import AdminHeader from "../../../components/AdminHeader";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    image_url: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      await fetchProducts();
    })();
  }, []);

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
      setError(err.message || "Failed to load products");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  function openEdit(product) {
    setEditingId(product.id);
    setEditForm({
      name: product.name,
      price: product.price,
      image_url: product.image_url,
    });
  }

  function closeEdit() {
    setEditingId(null);
    setEditForm({ name: "", price: "", image_url: "" });
  }

  async function saveProduct() {
    if (!editForm.name.trim() || !editForm.price) {
      setError("Name and price are required");
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const productData = {
        name: editForm.name.trim(),
        price: parseFloat(editForm.price),
        image_url: editForm.image_url.trim(),
      };

      let updateError;

      if (editingId === "NEW") {
        // Add new product
        const { error: insertError } = await supabase
          .from("products")
          .insert([productData]);
        updateError = insertError;
      } else {
        // Update existing product
        const { error: updateErr } = await supabase
          .from("products")
          .update(productData)
          .eq("id", editingId);
        updateError = updateErr;
      }

      if (updateError) throw updateError;

      // Refresh the products list
      await fetchProducts();
      closeEdit();
      // Force full reload to ensure app state sync
      if (typeof window !== 'undefined') window.location.reload();
    } catch (err) {
      setError(err.message || "Failed to save product");
      console.error("Save error:", err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1">
        <AdminHeader />

        <div className="p-8">
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Products</h2>
                <p className="text-gray-600 mt-1">Manage your product inventory</p>
              </div>
              <button
                onClick={() => {
                  setEditingId("NEW");
                  setEditForm({
                    name: "",
                    price: "",
                    image_url: "",
                  });
                }}
                className="bg-rose-600 hover:bg-rose-700 text-white py-2 px-6 rounded transition-colors font-medium"
              >
                + Add Product
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No products found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
                >
                  {/* Product Image */}
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/300x200?text=No+Image";
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900 truncate">
                      {product.name}
                    </h3>
                    <p className="text-rose-600 font-bold text-xl mt-2">
                      ₦{parseFloat(product.price).toFixed(2)}
                    </p>

                    {/* Edit Button */}
                    <button
                      onClick={() => openEdit(product)}
                      className="mt-4 w-full bg-rose-600 hover:bg-rose-700 text-white py-2 px-4 rounded transition-colors font-medium"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editingId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {editingId === "NEW" ? "Add New Product" : "Edit Product"}
            </h3>

            {/* Product Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-600"
                placeholder="Enter product name"
              />
            </div>

            {/* Product Price */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <input
                type="number"
                step="0.01"
                value={editForm.price}
                onChange={(e) =>
                  setEditForm({ ...editForm, price: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-600"
                placeholder="0.00"
              />
            </div>

            {/* Product Image URL */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={editForm.image_url}
                onChange={(e) =>
                  setEditForm({ ...editForm, image_url: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-600"
                placeholder="https://..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={closeEdit}
                disabled={saving}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={saveProduct}
                disabled={saving}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-2 px-4 rounded transition-colors font-medium disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
