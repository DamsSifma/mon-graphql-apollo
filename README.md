# 📚 GraphQL Apollo

Un exemple de projet full-stack GraphQL moderne avec Apollo Server et Apollo Client, développé en TypeScript.

Ce projet est composé de deux parties principales :

### Client (Frontend)

- **React 18** avec **TypeScript**
- **Vite** comme bundler et serveur de développement
- **Apollo Client** pour la gestion des requêtes GraphQL
- **GraphQL Code Generator** pour la génération automatique des types TypeScript

### Server (Backend)

- **Apollo Server v4** avec **TypeScript**
- **GraphQL** pour l'API
- Structure modulaire avec séparation des schémas, resolvers et données
- Support des requêtes avancées (pagination, filtrage, relations)

## Installation et Démarrage

### Prérequis

- **Node.js** (version 18 ou plus récente)
- **npm** ou **yarn**

### 1. Installation des dépendances

#### Serveur

```bash
cd server
npm install
```

#### Client

```bash
cd client
npm install
```

### 2. Démarrage de l'application

#### Démarrer le serveur GraphQL

```bash
cd server
npm run start
```

- Le serveur sera accessible sur : `http://localhost:4000`
- GraphQL Playground sera disponible sur : `http://localhost:4000/graphql`

#### Démarrer le client React

```bash
cd client
npm run dev
```

L'application client sera accessible sur : `http://localhost:5173`

On peut générer les types TypeScript depuis le schéma GraphQL avec `npm run codegen`

## 📁 Structure du Projet

```
graphql-apollo/
├── client/                 # Application React
│   ├── src/
│   │   ├── components/     # Composants React
│   │   ├── gql/           # Types et queries générés
│   │   ├── operations/    # Requêtes GraphQL personnalisées
│   │   └── ...
│   └── package.json
├── server/                 # Serveur Apollo
│   ├── src/
│   │   ├── schema/        # Schémas et resolvers GraphQL
│   │   ├── data/          # Données et modèles
│   │   ├── types/         # Types TypeScript
│   │   └── index.ts
│   └── package.json
└── README.md
```
