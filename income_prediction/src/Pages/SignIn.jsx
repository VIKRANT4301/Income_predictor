import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import "./styles.css";

function SignIn({ setUsername }) {
  const [username, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { username, password };

    try {
      const response = await axios.post("http://localhost:5000/signin", userData);

      if (response.data.message === "User signed in successfully") {
        localStorage.setItem("username", username);
        setUsername(username);
        setMessage("✅ Successfully logged in!");

        setTimeout(() => navigate("/"), 1500);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage(
        error.response ? error.response.data.message :"✅ Successfully logged in!"
      );
      setTimeout(() => navigate("/"), 1500);

    }
  };

  // Handle back button to navigate to home
  const handleBackButtonClick = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <div className="signin">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        {/* Username Field */}
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsernameInput(e.target.value)}
            required
            placeholder="Username"
          />
        </div>

        {/* Password Field with Eye Icon */}
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

        {/* Submit Button */}
        <button className="submit" type="submit">
          Sign In
        </button>
      </form>

      {/* Show success or error message */}
      {message && <p className="message">{message}</p>}

      {/* Link to Registration */}
      <p>
        Don't have an account? <a href="/signup">Register</a>
      </p>

      {/* Back Button */}
      <button className="back-button" onClick={handleBackButtonClick}>
        Back to Home
      </button>
    </div>
  );
}

export default SignIn;