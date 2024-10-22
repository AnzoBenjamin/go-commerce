import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";  // Import the Cart component
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./auth/authContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 p-6">
          <nav className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">E-Commerce App</h1>
            <div className="space-x-4">
              <Link to="/login" className="text-blue-500">Login</Link>
              <Link to="/signup" className="text-green-500">Signup</Link>
              <Link to="/products" className="text-blue-500">Products</Link>
              <Link to="/cart" className="text-green-500">Cart</Link> {/* Add Cart route */}
            </div>
          </nav>

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
