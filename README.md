# Projet MongoDB - Gestion de Livres et Auteurs

Ce projet a été réalisé dans le cadre de mes études à l'IIM, pour le cours de bases de données NoSQL. Il a été réalisé par QUentin GARNIER et Pierric LETARD (groupe C)

## Description

Il s'agit d'une API Node.js utilisant Express et MongoDB (via Mongoose) permettant de gérer une collection de livres et d'auteurs.  
Les principales fonctionnalités sont :
- Création, consultation, modification et suppression de livres et d'auteurs
- Recherche avancée sur les livres (titre, résumé, catégorie, type, édition, langue) et sur les auteurs (nom, prénom)
- Possibilité de lier un ou plusieurs auteurs à un livre
- Recherche textuelle avec pondération des champs

## Prérequis

- Node.js (version 18 ou supérieure recommandée)
- MongoDB (local ou distant)

## Installation

1. Clonez ce dépôt :
   ```bash
   git clone <url-du-repo>
   cd <nom-du-dossier>
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Configurez la connexion à MongoDB dans le fichier `.env` si besoin.

## Lancement

```bash
npm start
```

L'API sera disponible sur `http://localhost:3000` (par défaut).

## Endpoints principaux

- `GET /books` : liste des livres
- `POST /books` : création d'un livre
- `GET /authors` : liste des auteurs
- `POST /authors` : création d'un auteur
- `GET /books/search?q=mot` : recherche avancée sur les livres et auteurs
- `GET /books?populate=true` : informations sur l'auteur


