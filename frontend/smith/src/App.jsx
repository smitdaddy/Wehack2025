import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Signin from "./Components/Signin"; // remains Login.js
import Signup from "./Components/Signup";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} /> {/* updated route */}
          <Route path="/signup/:role?" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
