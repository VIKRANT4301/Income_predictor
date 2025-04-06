import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./signup.css";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Only one password state
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate hook

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { username, email, password };

    try {
      const response = await axios.post("http://localhost:5000/signup", userData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response ? error.response.data.message : "An error occurred"
      );
    }
  };

  const handleBackButtonClick = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {/* Username Field */}
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Username"
          />
        </div>

        {/* Email Field */}
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
        </div>

        <div className="password-container">
          <label>Password</label>
          <div className="input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
            <button
              type="button"
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button className="submit" type="submit">
          Sign Up
        </button>
      </form>

      {message && <p>{message}</p>}

      {/* Login Link */}
      <p>
        Already have an account? <a href="/signin">Login</a>
      </p>

      {/* Back Button */}
      <button className="back-button" onClick={handleBackButtonClick}>
        Back to Home
      </button>
    </div>
  );
}

export default SignUp;
