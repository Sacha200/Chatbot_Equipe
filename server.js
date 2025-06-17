const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes pour les différents sports
const sports = ['rugby', 'football', 'tennis', 'volley', 'cyclisme'];

sports.forEach(sport => {
  app.post(`/api/chat/${sport}`, (req, res) => {
    const { message } = req.body;
    // Simulation de réponse
    const response = `${sport.toUpperCase()} * ${Math.floor(Math.random() * 20)}`;
    res.json({ response });
  });
});

// Route de connexion
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  // Simulation simple d'authentification
  if (username === 'admin' && password === 'admin') {
    res.json({ token: 'fake-jwt-token', role: 'admin' });
  } else {
    res.json({ token: 'fake-jwt-token', role: 'user' });
  }
});

// Route pour les statistiques admin
app.get('/api/stats', (req, res) => {
  // Simulation de statistiques
  res.json({
    users: [
      { id: 1, username: 'user1', questionsCount: 15 },
      { id: 2, username: 'user2', questionsCount: 8 }
    ]
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});