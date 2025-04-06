import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IncomePredictor from "./components/IncomePredictor";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Home from "./Pages/Home";
import Result from './Pages/Result';
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predict" element={<IncomePredictor />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/result" element={<Result />} />
        </Routes>
    </Router>
  );
};

export default App;
