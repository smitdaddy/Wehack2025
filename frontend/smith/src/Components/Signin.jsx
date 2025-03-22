import React, { useState } from "react";
import "./Signin.css";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = (e) => {
    e.preventDefault();
    // handle sign-in logic here
    console.log({ email, password });
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
      </div>
    </div>
  );
}

export default Signin;
