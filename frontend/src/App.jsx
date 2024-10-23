import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import OrderHistory from "./components/OrderHistory";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./auth/authContext";
import AddProductForm from "./components/AddProduct";
import { useAuth } from "./auth/authContext";

function NavigationBar() {
  const { logout } = useAuth();
  return (
    <nav className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">E-Commerce App</h1>
      <div className="space-x-4">
        <Link to="/login" className="text-blue-500">Login</Link>
        <Link to="/signup" className="text-green-500">Signup</Link>
        <Link to="/products" className="text-blue-500">Products</Link>
        <Link to="/cart" className="text-green-500">Cart</Link>
        <Link to="/orders" className="text-purple-500">Orders</Link>
        <Link to="/addproduct" className="text-red-500">Add Product</Link>
        <button onClick={logout} className="text-gray-500">Logout</button>
      </div>
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 p-6">
          <NavigationBar />
          <ToastContainer position="bottom-right" autoClose={3000} />
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <ProductList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/addproduct"
              element={
                <ProtectedRoute>
                  <AddProductForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <h2 className="text-center text-xl">Welcome to the E-Commerce App!</h2>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;