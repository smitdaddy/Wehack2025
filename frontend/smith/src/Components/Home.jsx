import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to LawEase!</h1>
      <div className="role-cards">
        {/* Card #1: User */}
        <div className="card">
          <div className="icon">
            {/* You can replace this with an actual <img> or icon component */}
            <span
              role="img"
              aria-label="user icon"
              style={{ fontSize: "50px" }}
            >
              👤
            </span>
          </div>
          <h2>User</h2>
          <p>
            Access our platform as a regular user to explore and enjoy our
            services.
          </p>
          <Link to="/signup/user">
            <button>Select User</button>
          </Link>
        </div>

        {/* Card #2: Lawyer or Admin (your choice) */}
        <div className="card">
          <div className="icon">
            {/* Replace with a crown or relevant icon */}
            <span
              role="img"
              aria-label="crown icon"
              style={{ fontSize: "50px" }}
            >
              ⚖️
            </span>
          </div>
          <h2>Lawyer</h2>
          <p>
            Access features to manage legal cases, connect with clients, and
            more.
          </p>
          <Link to="/signup/lawyer">
            <button>Select Lawyer</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
