import React, { useState } from 'react';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './income.css'

function IncomePredictor() {
  const [formData, setFormData] = useState({
    Age: '',
    Education_Level: '',
    Number_of_Dependents: '',
    Occupation: '',
    Location: '',
    Work_Experience: '',
    Marital_Status: '',
    Employment_Status: '',
    Household_Size: '',
    Homeownership_Status: '',
    Type_of_Housing: '',
    Gender: '',
    Primary_Mode_of_Transportation: '',
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Start loading state
    setLoading(true);

    // Ensure data types are correct
    const features = {
      Age: parseInt(formData.Age),
      Education_Level: formData.Education_Level,
      Number_of_Dependents: parseInt(formData.Number_of_Dependents),
      Occupation: formData.Occupation,
      Location: formData.Location,
      Work_Experience: parseInt(formData.Work_Experience),
      Marital_Status: formData.Marital_Status,
      Employment_Status: formData.Employment_Status,
      Household_Size: parseInt(formData.Household_Size),
      Homeownership_Status: formData.Homeownership_Status,
      Type_of_Housing: formData.Type_of_Housing,
      Gender: formData.Gender,
      Primary_Mode_of_Transportation: formData.Primary_Mode_of_Transportation,
    };

    // Validate that all required fields are filled out
    for (let key in features) {
      if (!features[key] || features[key] === '') {
        setError(`Please fill out the ${key.replace(/_/g, ' ')} field.`);
        setLoading(false);
        return;
      }
    }

    console.log('Sending features to backend:', features);

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', features, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Prediction response:', response.data);

        // Navigate to result page with prediction data
        navigate('/result', {
            state: {
              prediction: response.data.prediction,
              error: null,
            },
          });
        } catch (error) {
          console.error('Error fetching prediction:', error);

          // Navigate to result page with error state
          navigate('/result', {
            state: {
              prediction: null,
              error: 'Error fetching prediction. Please try again later.',
            },
          });


        } finally {
          setLoading(false);
        }
      };

 // Handle form reset and clear
 const handleClear = () => {
    setFormData({
      Age: '',
      Education_Level: '',
      Number_of_Dependents: '',
      Occupation: '',
      Location: '',
      Work_Experience: '',
      Marital_Status: '',
      Employment_Status: '',
      Household_Size: '',
      Homeownership_Status: '',
      Type_of_Housing: '',
      Gender: '',
      Primary_Mode_of_Transportation: '',
    });
    setPrediction(null);
    setError(null);
  };



  return (
    <div className="income">
      <h1 className="heading">Income Prediction</h1>
      <div className="button-container">
      <button
          type="button"
          className="back-button"
          onClick={() => navigate('/')}
        >
            <FaArrowLeft className="icon" />
        </button>
      </div>



      <form onSubmit={handleSubmit} className="form">
        {/* Age */}
        <div className="age">
          <input
            type="number"
            name="Age"
            value={formData.Age}
            onChange={handleChange}
            className="a2"
            placeholder="Age"
          />
        </div>

        {/* Education Level */}
        <div className="education">
          <select
            name="Education_Level"
            value={formData.Education_Level}
            onChange={handleChange}
            className="b2"
          >
            <option value="">Select Education Level</option>
            <option value="High School">High School</option>
            <option value="Bachelor's">Bachelor's</option>
            <option value="Master's">Master's</option>
            <option value="PhD">PhD</option>
          </select>
        </div>

        {/* Number of Dependents */}
        <div className="dependents">
          <input
            type="number"
            name="Number_of_Dependents"
            value={formData.Number_of_Dependents}
            onChange={handleChange}
            className="c2"
            placeholder="Enter Dependents" 
          />
        </div>

        {/* Occupation */}
        <div className="occupation">
          <select
            name="Occupation"
            value={formData.Occupation}
            onChange={handleChange}
            className="d2"
          >
            <option value="">Select Occupation</option>
            <option value="Technology">Technology</option>
            <option value="Finance">Finance</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Location */}
        <div className="location">
          <select
            name="Location"
            value={formData.Location}
            onChange={handleChange}
            className="e2"
          >
            <option value="">Select Location</option>
            <option value="Urban">Urban</option>
            <option value="Rural">Rural</option>
            <option value="Suburban">Suburban</option>
          </select>
        </div>

        {/* Work Experience */}
        <div className="work">
          <input
            type="number"
            name="Work_Experience"
            value={formData.Work_Experience}
            onChange={handleChange}
            className="f2"
            placeholder='Work_Experience'
          />
        </div>

        {/* Marital Status */}
        <div className="martial">
          <select
            name="Marital_Status"
            value={formData.Marital_Status}
            onChange={handleChange}
            className="g2"
          >
            <option value="">Select Marital Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
          </select>
        </div>

        {/* Employment Status */}
        <div className="emp">
          <select
            name="Employment_Status"
            value={formData.Employment_Status}
            onChange={handleChange}
            className="j2"
          >
            <option value="">Select Employment Status</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Self-employed">Self-employed</option>
            <option value="Unemployed">Unemployed</option>
          </select>
        </div>

        {/* Household Size */}
        <div className="house">
          <input
            type="number"
            name="Household_Size"
            value={formData.Household_Size}
            onChange={handleChange}
            className="k2"
            placeholder='Household_Size'
          />
        </div>

        {/* Homeownership Status */}
        <div className="home">
          <select
            name="Homeownership_Status"
            value={formData.Homeownership_Status}
            onChange={handleChange}
            className="l2"
          >
            <option value="">Select Homeownership Status</option>
            <option value="Own">Own</option>
            <option value="Rent">Rent</option>
          </select>
        </div>

        {/* Type of Housing */}
        <div className="type">
          <select
            name="Type_of_Housing"
            value={formData.Type_of_Housing}
            onChange={handleChange}
            className="t2"
          >
            <option value="">Select Type of Housing</option>
            <option value="Apartment">Apartment</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Single-family home">Single-family home</option>
          </select>
        </div>

        {/* Gender */}
        <div className="r1">
          <select
            name="Gender"
            value={formData.Gender}
            onChange={handleChange}
            className="r2"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Primary Mode of Transportation */}
        <div className="prime">
          <select
            name="Primary_Mode_of_Transportation"
            value={formData.Primary_Mode_of_Transportation}
            onChange={handleChange}
            className="p2"
          >
            <option value="">Select Mode of Transportation</option>
            <option value="Car">Car</option>
            <option value="Public transit">Public transit</option>
            <option value="Biking">Biking</option>
            <option value="Walking">Walking</option>
          </select>
        </div>

        <div className="btn-group">
        <button
          type="submit"
          className="pred"
        >
          Predict
        </button>

       <button
          type="submit"
          className="clear-btn"
          onClick={handleClear}
         >
       Clear
       </button>
       </div>
      </form>

      {loading && (
        <div className="load">
          <h2 className="loading">Loading...</h2>
        </div>
      )}

      {error && (
        <div className="err">
          <h2 className="error">{error}</h2>
        </div>
      )}

      {prediction !== null && !loading && (

        <div className="pre">
          <h2 className="predicted">Predicted Income: ₹{prediction}</h2>
        </div>

      )}
    </div>
  );
}

export default IncomePredictor;