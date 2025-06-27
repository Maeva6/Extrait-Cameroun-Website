import { useState, useEffect } from "react";
import axios from "axios";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/api/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.error("Failed to load orders", err));
  }, []);

  return (
    <div className="bg-white border rounded-md p-6 shadow max-w-xl mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">📦 Order History</h2>
      {orders.length === 0 ? (
        <p className="text-sm text-gray-500">No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map(order => (
            <li key={order.id} className="border p-4 rounded-md hover:bg-gray-50 transition">
              <div className="flex justify-between text-sm font-medium">
                <span>Ref: {order.reference}</span>
                <span className="text-gray-600">{order.created_at.split("T")[0]}</span>
              </div>
              <div className="text-sm text-gray-700 mt-1">
                Total: <span className="font-semibold">€{order.total}</span><br />
                Status: <span className="capitalize">{order.status}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}