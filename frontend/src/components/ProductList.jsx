import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../auth/authContext";
import { toast } from "react-toastify";
import LoadingSpinner from "./LoadingSpinner";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { token, user } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/users/productview",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(response.data);
      } catch (err) {
        setError("Failed to load products. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [token]);

  const addToCart = async (productId) => {
    if (!user?._id) {
      toast.error("User ID not found. Please log in again.");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:8000/api/addtocart",  // Correct API endpoint
        {
          params: {
            id: productId,
            userID: user.user_id,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (response.status === 200) {
        toast.success("Product added to cart!");
      } else {
        toast.warning("Unexpected response from server");
      }
    } catch (err) {
      console.error("Add to cart error:", err.response || err);
      const errorMessage = err.response?.data?.message || "Failed to add product to cart.";
      toast.error(errorMessage);
    }
  };

  const instantBuy = async (productId) => {
    if (!user?._id) {
      toast.error("User ID not found. Please log in again.");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:8000/api/instantbuy",  // Correct API endpoint
        {
          params: {
            pid: productId,
            userid: user._id,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (response.status === 200) {
        toast.success("Order placed successfully!");
      } else {
        toast.warning("Unexpected response from server");
      }
    } catch (err) {
      console.error("Instant buy error:", err.response || err);
      const errorMessage = err.response?.data?.message || "Failed to complete purchase.";
      toast.error(errorMessage);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl mb-6 text-center">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.Product_ID}
            className="bg-white p-4 rounded-lg shadow-lg"
          >
            <img
              src={product.image}
              alt={product.product_name}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h3 className="text-xl font-semibold">{product.product_name}</h3>
            <p className="text-gray-600">${product.price}</p>
            <p className="text-yellow-500">Rating: {product.rating}/5</p>
            <div className="mt-4 space-x-2">
              <button
                onClick={() => addToCart(product.Product_ID)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Add to Cart
              </button>
              <button
                onClick={() => instantBuy(product.Product_ID)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
              >
                Instant Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;