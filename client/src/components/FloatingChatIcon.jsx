import React, { useState } from "react";
import Chatbot from "./Chatbot";
import { MessageCircle } from "lucide-react";

const FloatingChatIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "20px",
            zIndex: 999,
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          }}
        >
          <Chatbot />
        </div>
      )}

      <div
        onClick={toggleChat}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          backgroundColor: "#4f9aff",
          color: "white",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          zIndex: 999,
        }}
      >
        <MessageCircle size={30} />
      </div>
    </>
  );
};

export default FloatingChatIcon;
