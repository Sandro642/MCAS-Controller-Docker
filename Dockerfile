# filepath: /Users/sandromacbook/Documents/Github/MCAS-Controller-Docker/Dockerfile
# Étape 1 : Utiliser une image Node.js officielle comme base
FROM node:18-alpine

# Étape 2 : Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Étape 3 : Copier les fichiers nécessaires dans le conteneur
COPY package*.json ./
COPY tsconfig.json ./

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier le reste du code dans le conteneur, en excluant node_modules
COPY . .

# Étape 6 : Compiler le TypeScript en JavaScript
RUN npx tsc

# Étape 7 : Spécifier la commande pour exécuter l'application
CMD ["node", "dist/index.js"]

# Étape 8 : Exposer le port utilisé par l'application (facultatif, selon ton app)
EXPOSE 8443