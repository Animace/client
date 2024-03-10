import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from 'axios'; // Import Axios

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registrationError, setRegistrationError] = useState(null);
  const [redirect, setRedirect] = useState(false);

  async function register(ev) {
    ev.preventDefault();

    try {
      const response = await axios.post("https://api-ct45.onrender.com/register", { username, password }, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        alert('Registration successful');
        setRedirect(true);
      } else {
        // If the server responds with an error, set the error message
        const errorData = response.data;
        setRegistrationError(errorData.message || 'Registration failed');
      }
    } catch (error) {
      console.error("Registration error:", error);
      setRegistrationError('An unexpected error occurred during registration');
    }
  }
  
  if (redirect) {
    return <Navigate to={'/login'} />;
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      {registrationError && <p className="error-message">{registrationError}</p>}
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button>Register</button>
    </form>
  );
}
