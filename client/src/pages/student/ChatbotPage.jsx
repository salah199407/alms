import { useState } from "react";
import axios from "axios";

const ChatbotPage = () => {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/chatbot/analyze-message", {
        message,
      });

      setResult(response.data);
    } catch (error) {
      console.error("Erreur lors de l'analyse :", error.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>💬 Assistant de formation</h2>
      <textarea
        rows="4"
        placeholder="Ex: Je veux apprendre Python ou I want to learn web development"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: "100%", marginBottom: "1rem" }}
      />
      <button onClick={handleSend} disabled={loading}>
        {loading ? "Analyse en cours..." : "Envoyer"}
      </button>

      {result && (
        <div style={{ marginTop: "2rem" }}>
          <h3>✅ Résultat :</h3>
          <p><strong>Catégorie détectée :</strong> {result.analyse.categorie_detectee}</p>
          <p><strong>Objectif :</strong> {result.analyse.objectifs_estimes}</p>

          <h4>📚 Formations recommandées :</h4>
          <ul>
            {result.cours_recommandes.map((course) => (
              <li key={course._id}>
                <strong>{course.title}</strong> – {course.level}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ChatbotPage;
