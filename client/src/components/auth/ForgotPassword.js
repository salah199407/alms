import { useState } from "react";
import { forgotPasswordService } from "@/services";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await forgotPasswordService(email);
      setMessage(response.message);
    } catch (error) {
      setMessage("Error sending reset link.");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
        <button type="submit">Send Reset Link</button>
      </form>
      <p>{message}</p>
    </div>
  );
}