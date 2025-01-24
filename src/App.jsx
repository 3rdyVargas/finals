import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DestinationPage from "./components/destinationPage";
// import LogInPage from "./components/logInPage";
import BorrowBookPage from "./components/borrowBookPage";
import { UserProvider } from "./contexts/userContext"; // Import the provider
import ReturnBookPage from "./components/returnBookPage";
import StudentNumberPage from "./components/studentNumberPage";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<DestinationPage />} />
          {/* <Route path="/login/:action" element={<LogInPage />} /> */}
          <Route path="/borrow" element={<BorrowBookPage />} />
          <Route path="/return-book" element={<ReturnBookPage/>}/>
          <Route path="/destination" element={<DestinationPage />} />
          <Route path="/student-number" element = {<StudentNumberPage/>}/>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
