import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../auth/authContext";  // Import the useAuth hook


const SignupForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();  // For navigation after login

  const { signup } = useAuth();  // Use the login function from context
 

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/users/signup", {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        phone
      });
      const { token, _id } = response.data;
      signup(token, {firstName, lastName, email, phone, id:_id})
      alert("Signup successful!");
      navigate("/");  // Redirect to home page

    } catch (err) {
      setError("Signup failed. Please try again.");
      console.error(err)
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-sm" onSubmit={handleSignup}>
        <h2 className="text-2xl mb-6">Sign Up</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
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
        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Sign Up</button>
        <p className="mt-4">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
      </form>
    </div>
  );
};

export default SignupForm;
