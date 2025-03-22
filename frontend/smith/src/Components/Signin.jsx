import React, { useState } from "react";
import "./Signin.css";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Signin successful!");
        // Optionally: save a token, redirect user, etc.
      } else {
        setMessage(`Error: ${result.error || "Signin failed"}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred during sign in.");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        {/* Top curved header */}
        <div className="signin-header">
          <div className="icon-wrapper">
            {/* You can replace the emoji with an actual icon or image */}
            <span role="img" aria-label="profile" className="profile-icon">
              👤
            </span>
          </div>
        </div>

        <h2>Welcome Back</h2>

        <form onSubmit={handleSignin} className="signin-form">
          <div className="form-group">
            <label>Email ID</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <button type="submit" className="submit-btn">
            Sign in
          </button>
        </form>
        {message && <p className="signin-message">{message}</p>}
      </div>
    </div>
  );
}

export default Signin;
