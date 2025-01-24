import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './returnBookPage.css';

const ReturnBookPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookData, setBookData] = useState(null);
  const [error, setError] = useState(null);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchBorrowedBookData = async () => {
      try {
        const studentNumber = location.state?.studentNumber;
        if (!studentNumber) {
          navigate("/student-number"); // Redirect to the enter student number page if no student number
          return;
        }

        const response = await fetch(`${baseUrl}/api/borrows/borrow/${studentNumber}`);
        if (!response.ok) {
          throw new Error("Failed to fetch borrowed books");
        }
        const borrowedBookData = await response.json();
        setBookData(borrowedBookData);
      } catch (error) {
        setError("Failed to fetch borrowed books");
      }
    };

    fetchBorrowedBookData();
  }, [location.state, navigate]);

  const handleReturnBook = async (bookId) => {
    try {
      const response = await fetch(`${baseUrl}/api/borrows/return`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentNumber: location.state.studentNumber,
          bookId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to return the book");
      }

      alert("Book has been returned successfully!");
      // Optionally, you can refresh the book data or navigate to another page
      navigate("/destination"); // Redirect to destination page after return
    } catch (error) {
      setError("Failed to return the book");
    }
  };

  return (
    <div className="form-card">
      <h1>Return a Book</h1>
      
      {error && <p className="error-message">{error}</p>} {/* Show error message if fetching borrowed books fails */}
      
      {bookData ? (
        <div className="book-details">
          <h2>Book Details:</h2>
          {bookData.map((book) => (
            <div key={book._id}>
              <p>Book Title: {book.bookTitle}</p>
              <p>Category: {book.category}</p>
              <p>Borrowed Date: {book.borrowDate}</p>
              <p>Borrowed Time: {book.borrowTime}</p>
              <p>Location: {book.location}</p>
              <button onClick={() => handleReturnBook(book._id)} className="Enter-btn">
                Return Book
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No book details found!</p>
      )}
    </div>
  );
};

export default ReturnBookPage;