import React, { useState } from "react";
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
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setCertificate(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Use FormData to handle file upload
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    // Include role (default to "user" if not provided)
    formData.append("role", role || "user");

    if (isLawyer && certificate) {
      formData.append("certificate", certificate);
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        body: formData, // Do not set Content-Type here; the browser will set it automatically
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(result.message || "Signup successful!");
        // Optionally, reset the form fields here
      } else {
        setMessage(`Error: ${result.error || "Signup failed"}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred during signup.");
    }
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

        {message && <p className="signup-message">{message}</p>}

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
