"use client";

import { useEffect, useState } from "react";
import supabase from "../../../services/supabaseClient";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();

    // subscribe to realtime changes on orders so admin sees new orders immediately
    let subscription = null;
    try {
      if (supabase.channel) {
        subscription = supabase
          .channel("public:orders")
          .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "orders" },
            () => {
              fetchOrders();
            }
          )
          .subscribe();
      } else if (typeof supabase.from === "function") {
        subscription = supabase.from("orders").on("*", () => fetchOrders()).subscribe();
      }
    } catch (err) {
      console.warn("Orders realtime subscription failed", err);
    }

    return () => {
      try {
        if (!subscription) return;
        if (subscription.unsubscribe) subscription.unsubscribe();
        if (supabase.removeChannel && subscription) supabase.removeChannel(subscription);
      } catch (e) {
        // ignore
      }
    };
  }, []);

  async function fetchOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select(`
        id,
        status,
        total_price,
        created_at,

        profiles (
          full_name,
          email
        ),

        order_items (
          quantity,
          price,

          products (
            name,
            image_url
          )
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setOrders(data);
    }
  }

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1">
        <AdminHeader />

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">
            Customer Orders
          </h2>

          {orders.length === 0 && (
            <p>No orders yet.</p>
          )}

          <div className="flex flex-col gap-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border rounded-lg p-4 shadow"
              >
                {/* Order Info */}
                <div className="flex justify-between mb-4">
                  <div>
                    <p className="font-semibold">
                      {order.profiles?.full_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.profiles?.email}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      ₦{order.total_price}
                    </p>

                    <span className="text-sm bg-yellow-100 px-2 py-1 rounded">
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="grid grid-cols-3 gap-4">
                  {order.order_items.map(
                    (item, i) => (
                      <div
                        key={i}
                        className="border p-2 rounded"
                      >
                        <img
                          src={
                            item.products
                              ?.image_url
                          }
                          className="h-24 w-full object-cover rounded"
                        />

                        <p className="text-sm font-semibold mt-1">
                          {
                            item.products?.name
                          }
                        </p>

                        <p className="text-sm">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    )
                  )}
                </div>

                <p className="text-xs text-gray-400 mt-3">
                  Ordered on{" "}
                  {new Date(
                    order.created_at
                  ).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
