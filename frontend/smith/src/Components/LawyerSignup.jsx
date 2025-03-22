import React, { useState } from "react";

function LawyerSignup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [certificate, setCertificate] = useState(null);

  const handleFileChange = (e) => {
    setCertificate(e.target.files[0]);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // handle lawyer signup logic here
    console.log({ fullName, email, password, phone, certificate });
  };

  return (
    <form className="form" onSubmit={handleSignup}>
      <h2>Lawyer Signup</h2>
      <div className="form-group">
        <label>Full Name:</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Phone Number:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Upload Certificate:</label>
        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.jpg,.png"
          required
        />
      </div>
      <button type="submit">Verify</button>
    </form>
  );
}

export default LawyerSignup;
