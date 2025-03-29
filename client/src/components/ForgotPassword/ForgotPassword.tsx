import { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  console.log("CHECK email", email);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/auth/forgot-password", {
      email,
    });
    alert("Check your email for reset link");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Forgot Password</h2>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit">Send Reset Link</button>
    </form>
  );
}
