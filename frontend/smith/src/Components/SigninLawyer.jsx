import React, { useState } from "react";
import "./Signin.css";

function SigninLawyer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/signin/lawyer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Lawyer sign-in successful!");
        // Optionally: save a token, redirect user, etc.
      } else {
        setMessage(`Error: ${result.error || "Lawyer sign-in failed"}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred during lawyer sign-in.");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <div className="signin-header">
          <div className="icon-wrapper">
            <span role="img" aria-label="profile" className="profile-icon">
              ⚖️
            </span>
          </div>
        </div>

        <h2>Lawyer Sign-in</h2>

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
            Sign in as Lawyer
          </button>
        </form>
        {message && <p className="signin-message">{message}</p>}
      </div>
    </div>
  );
}

export default SigninLawyer;
