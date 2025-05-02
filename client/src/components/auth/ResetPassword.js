import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { resetPasswordService } from "@/services";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await resetPasswordService(token, newPassword);
      setMessage(response.message);
    } catch (error) {
      setMessage("Error resetting password.");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" />
        <button type="submit">Reset Password</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

