import { useState } from "react";
import axios from "axios";
import { useAuth } from "../auth/authContext";
import { toast } from 'react-toastify';

const AddProductForm = () => {
  const { token } = useAuth();  // Use token from auth context to authenticate the request
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    const productData = {
      product_name: productName,
      price: parseFloat(price),
      rating: parseInt(rating),
      image: image,
    };

    try {
      await axios.post("http://localhost:8000/admin/addproduct", productData, {
        headers: {
          Authorization: `Bearer ${token}`,  // Attach token for authorization
        },
      });
      toast.success("Product added successfully!");
      // Clear form fields after successful submission
      setProductName("");
      setPrice("");
      setRating("");
      setImage("");
    } catch (err) {
      toast.error("Failed to add product. Please try again.");
      console.error(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex justify-center items-center">
      <form onSubmit={handleAddProduct} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4">Add New Product</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Price ($)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Rating</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
            min="1"
            max="5"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Image URL</label>
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>

        <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded ${loading ? 'opacity-50' : ''}`}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
