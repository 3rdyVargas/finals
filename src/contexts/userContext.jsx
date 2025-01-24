import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [borrowedBookData, setBorrowedBookData] = useState(null); // Stores borrowed book data
  
  return (
    <UserContext.Provider value={{ borrowedBookData, setBorrowedBookData }}>
      {children}
    </UserContext.Provider>
  );
};