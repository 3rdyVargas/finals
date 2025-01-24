import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import "./destinationPage.css"; // Import CSS for styling

const DestinationPage = () => {
  const navigate = useNavigate();

  const handleBorrow = () => {
    navigate("/borrow");
  };

  const handleReturn = () => {
    navigate("/student-number");
  };

  return (
      <div className="destination-form-card">
        <h1>Hello, Isko/Iska!!</h1>
        <p>Nothing is pleasanter than exploring a library</p>
        <p>Choose your destination</p>

        {/* Borrow a Book Button */}
        <button type="button" className="Borrow-btn" onClick={handleBorrow}>
          Borrow a book
        </button>

        {/* Return a Book Button */}
        <button type="button" className="Return-btn" onClick={handleReturn}>
          Return a book
        </button>
      </div>
  );
};

export default DestinationPage;

