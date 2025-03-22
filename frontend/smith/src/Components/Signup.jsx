import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const { role } = useParams(); // "user" or "lawyer"
  const isLawyer = role === "lawyer";

  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [certificate, setCertificate] = useState(null);

  const handleFileChange = (e) => {
    setCertificate(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle signup logic here
    // e.g., send to backend or show console
    console.log({
      role: role || "user", // default to user if role is undefined
      fullName,
      email,
      phone,
      password,
      certificate,
    });
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        {/* Top arc / header with icon */}
        <div className="signup-header">
          <div className="icon-wrapper">
            {/* You can replace this emoji with an actual icon/image */}
            <span role="img" aria-label="profile" className="profile-icon">
              👤
            </span>
          </div>
        </div>

        <h2>Create Account</h2>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Only show certificate upload if role === "lawyer" */}
          {isLawyer && (
            <div className="form-group">
              <label>Upload Certificate</label>
              <input
                type="file"
                accept=".pdf, .png, .jpg"
                onChange={handleFileChange}
                required
              />
            </div>
          )}

          <button type="submit" className="submit-btn">
            Create Account
          </button>
        </form>

        <p className="signin-link">
          Already a user?{" "}
          <Link to="/signin" className="link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
