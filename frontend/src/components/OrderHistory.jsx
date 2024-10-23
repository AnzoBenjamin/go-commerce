import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../auth/authContext";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const { token } = useAuth();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8000/users/productview", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);  // Assuming the API returns an array of orders
        console.log(response.data)
        
      } catch (err) {
        setError("Failed to load order history.");
        console.error(err)
      }
    };

    fetchOrders();
  }, [token]);

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (orders.length === 0) {
    return <div className="text-center mt-6">You have no orders yet.</div>
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl mb-6 text-center">Order History</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {orders.map((order) => (
          <div key={order.Order_ID} className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Order #{order.Order_ID}</h3>
            <p className="text-gray-600">Total Price: ${order.total_price}</p>
            <p className="text-gray-600">Ordered On: {new Date(order.Orderered_At).toLocaleDateString()}</p>
            <p className="text-gray-600">Payment Method: {order.Payment_Method?.Digital ? 'Digital' : 'Cash on Delivery'}</p>
            <div className="mt-4">
              <h4 className="font-semibold">Items:</h4>
              <ul className="list-disc list-inside">
                {order.Order_Cart.map((item) => (
                  <li key={item.Product_ID}>
                    {item.product_name} - ${item.price}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
