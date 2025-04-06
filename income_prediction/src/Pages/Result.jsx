import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './result.css'

const Result = () => {
  const location = useLocation();
  const { prediction, error } = location.state || {};

  return (
    <div className="result-container">
      <h2>Income Prediction Result</h2>

      {error ? (
        <div className="err">
          <h2 className="error">{error}</h2>
        </div>
      ) : (
        <div className="pre">
          <h2 className="predicted">
            Predicted Income: ₹{prediction ? prediction.toLocaleString() : 'N/A'}
          </h2>
        </div>
      )}

      {/* Back to Home Button */}
      <Link to="/" className="back-btn">
        Back to Home
      </Link>
    </div>
  );
};

export default Result;
