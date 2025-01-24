# Liste des Commandes pour le Système MCAS

## Commandes Principales

### Statut du MCAS
- **mcas status** : Affiche l'état actuel du MCAS (activé, désactivé, forcé, etc.).
- **mcas enable** : Active le MCAS.
- **mcas disable** : Désactive le MCAS.
- **mcas reset** : Réinitialise le MCAS à son état par défaut.

### Contrôle d'Assiette (Pitch)
- **mcas pitch up [value]** : Augmente l'assiette de l'avion (valeur en degrés ou pourcentage).
- **mcas pitch down [value]** : Diminue l'assiette de l'avion.

### Contrôle de Lacet (Yaw)
- **mcas yaw left [value]** : Vire à gauche (valeur en degrés ou pourcentage).
- **mcas yaw right [value]** : Vire à droite.

### Contrôle de Roulis (Roll)
- **mcas roll left [value]** : Incline l'avion vers la gauche.
- **mcas roll right [value]** : Incline l'avion vers la droite.

## Commandes Avancées

### Simulation de Paramètres Environnementaux
- **mcas set wind [direction] [speed]** : Définit la direction et la vitesse du vent (en degrés et en nœuds).
- **mcas set turbulence [level]** : Définit le niveau de turbulence (léger, modéré, sévère).
- **mcas set altitude [value]** : Définit l'altitude actuelle (en pieds).

### Dépannage et Tests
- **mcas test loopback** : Effectue un test en boucle pour vérifier les réponses du système.
- **mcas debug on** : Active le mode de débogage.
- **mcas debug off** : Désactive le mode de débogage.

## Commandes de Journalisation
- **mcas log start** : Démarre la journalisation des commandes et réponses.
- **mcas log stop** : Arrête la journalisation.
- **mcas log show** : Affiche les journaux actuels.
- **mcas log clear** : Efface les journaux.

## Commandes de Sécurité
- **mcas emergency disable** : Désactive immédiatement le MCAS en cas d'urgence.
- **mcas override [command]** : Force l'exécution d'une commande, même si le MCAS est désactivé.

## Commandes Simulées
- **mcas simulate failure [type]** : Simule une panne spécifique (type : capteur, hydraulique, etc.).
- **mcas simulate recovery [type]** : Simule une récupération après une panne spécifique.

## Informations du Système
- **mcas info** : Affiche les informations générales sur le système MCAS.
- **mcas sensors** : Affiche les données des capteurs liés au MCAS.
- **mcas version** : Affiche la version actuelle du logiciel MCAS.
