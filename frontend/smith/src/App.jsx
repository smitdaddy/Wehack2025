import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import SigninUser from "./Components/SigninUser";
import SigninLawyer from "./Components/SigninLawyer";
import Signup from "./Components/Signup";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin/user" element={<SigninUser />} />
          <Route path="/signin/lawyer" element={<SigninLawyer />} />
          <Route path="/signup/:role?" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
