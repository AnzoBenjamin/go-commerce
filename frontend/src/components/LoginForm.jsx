import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../auth/authContext";  // Import the useAuth hook

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();  // Use the login function from context
  const navigate = useNavigate();  // For navigation after login

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email, password)
    try {
      const response = await axios.post("http://localhost:8000/users/login", { email, password });
      const { token } = response.data;
      login(token);  // Call the login method to set the token globally
      alert("Login successful!");
      navigate("/");  // Redirect to home page
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error(err)
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-sm" onSubmit={handleLogin}>
        <h2 className="text-2xl mb-6">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
        <p className="mt-4">Don&apos;t have an account? <Link to="/signup" className="text-green-500">Sign Up</Link></p>
      </form>
    </div>
  );
};

export default LoginForm;
