import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiLogOut } from 'react-icons/fi';
import './Home.css'


const Home = () => {
  const [username, setUsername] = useState(null);

  // Get username from localStorage on load
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("username"); // Remove username from localStorage
    setUsername(null); // Reset state
  };

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <h2>Income Predictor</h2>
        <ul className="navbar-list">
          <li>
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/predict" className="navbar-link">
              Predict
            </Link>
          </li>

          <li>
            <Link to="/result" className="navbar-link">
              Result
            </Link>
          </li>
          {!username ? (
            <>
              <li>
                <Link to="/signin" className="navbar-link">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/signup" className="navbar-link">
                  Sign Up
                </Link>
              </li>
            </>
          ) : (
            <li className="user-menu">
            <span className="navbar-link">Hello, {username}</span>
            <button onClick={handleLogout} className="logout-btn" title="Logout">
            <FiLogOut className="logout-icon" />
            </button>
          </li>
          
          )}
        </ul>
      </nav>

      {/* Main Content */}
      <div className="content">
        <h1>Welcome to Income Predictor</h1>
        <p>Discover Insights into Financial Future! Use Our AI- Powered Tool to Predict Your Income Based on Various Factor</p>
        <button className="get-started-btn">
          <Link to="/predict" className="btn-link">
            Get Started
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
