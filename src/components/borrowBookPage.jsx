import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/userContext"; // Import context
import './borrowBookPage.css';

const BorrowBookPage = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const { setBorrowedBookData } = useUserContext(); // Access context to set borrowed book data
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [borrowData, setBorrowData] = useState({
    category: "",
    bookTitle: "",
    borrowDate: new Date().toLocaleDateString(),
    borrowTime: new Date().toLocaleTimeString(),
    location: "",
    studentNumber: "",
  });

  const [submitted, setSubmitted] = useState(false); // Track submission

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBorrowData({
      ...borrowData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Alert and logic for the "Outside Campus" case
    if (borrowData.location === "Outside Campus") {
      alert(
        `Good day, Isko/Iska,

The PUPBC just wants to advise you that losing a book outside the campus is prohibited and has a serious penalty.

What to do if you lose a book:
1. Report the loss: Immediately notify the library staff where you checked out the book. 
2. Replace the book: Replace the book with the same title or a similar title. 
3. Pay a fine: Pay a fine that may be a percentage of the book's cost. 
4. Meet a deadline: Return the book or pay for it within a specified time frame.

What happens if you don't replace or pay for the book:
- You may be charged additional fines.
- Your borrowing privileges may be suspended.
- You may face disciplinary action.

Thank you for your cooperation.`
      );
    }

    try {
      const response = await fetch(`${baseUrl}/api/borrows/borrow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(borrowData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setBorrowedBookData(data);
      alert(`Book Borrowed: ${borrowData.bookTitle} \nCategory: ${borrowData.category}`);
      alert("Thank you for borrowing, Isko/Iska!");
      setSubmitted(true); // Trigger navigation
    } catch (error) {
      alert(`Failed to borrow book: ${error.message}`);
    }
  };

  // Navigate after submission
  React.useEffect(() => {
    if (submitted) {
      navigate("/");
    }
  }, [submitted, navigate]);

  return (
    <div className="form-card">
      <h1>Borrow a Book</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={borrowData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="fiction">Fiction</option>
            <option value="non-fiction">Non-Fiction</option>
            <option value="science">Science</option>
            <option value="history">History</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="bookTitle">Book Title</label>
          <input
            type="text"
            id="bookTitle"
            name="bookTitle"
            placeholder="Enter book title"
            value={borrowData.bookTitle}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="studentNumber">Student Number</label>
          <input
            type="text"
            id="studentNumber"
            name="studentNumber"
            placeholder="Enter your Student Number"
            value={borrowData.studentNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="location">Location</label>
          <select
            id="location"
            name="location"
            value={borrowData.location}
            onChange={handleChange}
            required
          >
            <option value="">Select Location</option>
            <option value="Inside Campus">Inside Campus</option>
            <option value="Outside Campus">Outside Campus</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="borrowDate">Date Borrowed</label>
          <input
            type="text"
            id="borrowDate"
            name="borrowDate"
            value={borrowData.borrowDate}
            readOnly
          />
        </div>

        <div className="form-field">
          <label htmlFor="borrowTime">Time Borrowed</label>
          <input
            type="text"
            id="borrowTime"
            name="borrowTime"
            value={borrowData.borrowTime}
            readOnly
          />
        </div>

        <button type="submit" className="Enter-btn">
          Borrow Book
        </button>
      </form>
    </div>
  );
};

export default BorrowBookPage;