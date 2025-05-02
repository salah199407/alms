// server/chatbotState.js

// Stockage en mémoire des sessions utilisateur
let sessions = {};

// Initialiser une session
function initSession(userId) {
  sessions[userId] = {
    step: 1,
    data: {
      objectif: null,
      level: null,
      connaissances: [],
      wantsLearningPath: null,
    },
  };
}

// Obtenir une session (crée une nouvelle si elle n'existe pas)
function getSession(userId) {
  if (!sessions[userId]) {
    initSession(userId);
  }
  return sessions[userId];
}

// Mettre à jour une session avec une nouvelle donnée
function updateSession(userId, key, value) {
  const session = getSession(userId);
  session.data[key] = value;
  session.step += 1;
}

// Exporter les fonctions
module.exports = {
  getSession,
  updateSession,
};
