import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userId] = useState("aya123");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text: "👋 Salut ! Quel est ton objectif d’apprentissage ?",
      },
    ]);
  }, []);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    try {
      const res = await axios.post("http://localhost:5000/api/chatbot/chat", {
        userId,
        message: input,
      });

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: res.data.response },
      ]);
      setInput("");
    } catch (err) {
      console.error("Erreur :", err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "❌ Erreur de connexion au serveur.",
        },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chatbot-input">
        <input
          type="text"
          placeholder="Écris ta réponse ici..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={sendMessage}>Envoyer</button>
      </div>
    </div>
  );
};

export default Chatbot;
