import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './returnBookPage.css';

const StudentNumberPage = () => {
  const [studentNumber, setStudentNumber] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleChange = (e) => {
    setStudentNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/api/borrows/borrow/${studentNumber}`);
      if (!response.ok) {
        throw new Error("Failed to fetch borrowed books");
      }
      const borrowedBookData = await response.json();

      // Pass the studentNumber and borrowed book data to the next page
      navigate("/return-book", {
        state: { studentNumber, borrowedBookData }, // Pass the state
      });
    } catch (error) {
      setError("Failed to fetch borrowed books");
    }
  };

  return (
    <div className="form-card">
      <h1>Enter Student Number</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <input
            type="text"
            placeholder="Enter your Student Number"
            value={studentNumber}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="Enter-btn">
          Submit
        </button>
      </form>

      {error && <p className="error-message">{error}</p>} {/* Show error message if fetching borrowed books fails */}
    </div>
  );
};

export default StudentNumberPage;