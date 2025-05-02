import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import correct

export default function NotFoundPage() {
  const navigate = useNavigate(); // ✅ Déclaration correcte

  function handleGoBack() {
    navigate(-1); // ✅ Revenir à la page précédente
  }

  return (
    <div style={styles.page_404}>
      <div style={styles.container}>
        <div style={styles.row}>
          <div style={styles.column}>
            {/* Titre 404 */}
            <h1 style={styles.big404}>404</h1>

            {/* Image de fond animée */}
            <div style={styles.four_zero_four_bg}></div>

            {/* Texte et bouton */}
            <div style={styles.content_box_404}>
              <h2 style={styles.heading}>Looks like you're lost</h2>
              <p style={styles.paragraph}>
                The page you are looking for is not available!
              </p>
              <button onClick={handleGoBack} style={styles.link_404}>
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ✅ Styles CSS en JS
const styles = {
  page_404: {
    padding: "40px 0",
    background: "#fff",
    fontFamily: "'Arvo', serif",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
  },
  container: {
    width: "100%",
    maxWidth: "1140px",
    margin: "0 auto",
    padding: "0 15px",
  },
  row: {
    display: "flex",
    justifyContent: "center",
  },
  column: {
    textAlign: "center",
    maxWidth: "800px",
    width: "100%",
  },
  four_zero_four_bg: {
    backgroundImage:
      "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "400px",
    borderRadius: "8px",
  },
  big404: {
    fontSize: "120px",
    color: "#ff7b00", // Couleur orange
    marginBottom: "10px",
    fontWeight: "bold",
    backgroundColor: "transparent",
    textAlign: "center",
  },
  content_box_404: {
    marginTop: "30px",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "10px",
  },
  paragraph: {
    color: "#666",
    fontSize: "16px",
    marginBottom: "20px",
  },
  link_404: {
    display: "inline-block",
    backgroundColor: "#ff6b00",
    color: "#fff",
    padding: "12px 24px",
    textDecoration: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    transition: "background 0.3s ease",
    border: "none",          // ✅ Style pour bouton
    cursor: "pointer",        // ✅ Curseur main
  },
};
