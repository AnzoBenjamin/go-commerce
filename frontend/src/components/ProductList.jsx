import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../auth/authContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { token } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/users/productview", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
      } catch (err) {
        setError("Failed to load products. Please try again.");
        console.error(err)
      }
    };

    fetchProducts();
  }, [token]);

  const addToCart = async (productId) => {
    try {
      await axios.get("http://localhost:8000/addtocart", {
        params: { product_id: productId },  // Assuming the API expects the product ID as a query parameter
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess("Product added to cart successfully!");
    } catch (err) {
      setError("Failed to add product to cart.");
      console.error(err)

    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl mb-6 text-center">Products</h2>
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.Product_ID} className="bg-white p-4 rounded-lg shadow-lg">
            <img
              src={product.image}
              alt={product.product_name}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h3 className="text-xl font-semibold">{product.product_name}</h3>
            <p className="text-gray-600">${product.price}</p>
            <p className="text-yellow-500">Rating: {product.rating}/5</p>
            <button
              onClick={() => addToCart(product.Product_ID)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
