import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../auth/authContext";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { token } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/listcart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(response.data);  // Assuming the backend sends the cart as an array of products
      } catch (err) {
        setError("Failed to load cart items.");
        console.error(err)
      }
    };

    fetchCartItems();
  }, [token]);

  const removeFromCart = async (productId) => {
    try {
      await axios.get("http://localhost:8000/api/removeitem", {
        params: {id: productId },  // Assuming the API expects the product ID as a query parameter
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess("Item removed from cart.");
      setCartItems(cartItems.filter(item => item.Product_ID !== productId));  // Remove the item locally
    } catch (err) {
      setError("Failed to remove item from cart.");
      console.error(err)
    }
  };

  const checkout = async () => {
    try {
      await axios.get("http://localhost:8000/api/cartcheckout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess("Checkout successful!");
      setCartItems([]);  // Clear the cart after successful checkout
    } catch (err) {
      setError("Failed to complete checkout.");
      console.error(err)
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (cartItems.length === 0) {
    return <div className="text-center mt-6">Your cart is empty.</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl mb-6 text-center">Your Cart</h2>
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cartItems.map((item) => (
          <div key={item.Product_ID} className="bg-white p-4 rounded-lg shadow-lg">
            <img
              src={item.image}
              alt={item.product_name}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h3 className="text-xl font-semibold">{item.product_name}</h3>
            <p className="text-gray-600">${item.price}</p>
            <p className="text-yellow-500">Rating: {item.rating}/5</p>
            <button
              onClick={() => removeFromCart(item.Product_ID)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={checkout}
          className="bg-green-500 text-white px-6 py-2 rounded"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
