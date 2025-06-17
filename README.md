# Chatbot Sportif L'Équipe

Un chatbot sportif permettant aux utilisateurs de poser des questions sur différents sports (Rugby, Football, Tennis, Volley et Cyclisme).

## Prérequis

- Node.js (v14 ou supérieur)
- npm ou yarn

## Installation

1. Cloner le repository
2. Installer les dépendances du backend :
```bash
npm install
```

3. Installer les dépendances du frontend :
```bash
cd frontend
npm install
```

## Démarrage

1. Démarrer le backend :
```bash
npm run dev
```

2. Dans un autre terminal, démarrer le frontend :
```bash
cd frontend
npm run serve
```

## Utilisation

1. Ouvrir votre navigateur et accéder à `http://localhost:8080`
2. Se connecter avec les identifiants suivants :
   - Utilisateur normal : username: `user`, password: `user`
   - Administrateur : username: `admin`, password: `admin`

## Fonctionnalités

- Interface de chat pour chaque sport
- Authentification des utilisateurs
- Panel d'administration pour suivre les statistiques
- Réponses streaming en temps réel
- Design responsive et moderne

## Structure du projet

```
.
├── server.js              # Backend Express
├── package.json          # Dépendances backend
├── frontend/             # Application Vue.js
│   ├── src/
│   │   ├── components/   # Composants Vue
│   │   ├── views/        # Pages
│   │   ├── store/        # Vuex store
│   │   └── router/       # Vue Router
│   └── package.json      # Dépendances frontend
└── README.md
``` 