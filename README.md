<p align="center">
  <a href="https://heinezo.github.io" target="_blank"><img src="img/logo.png" width="200" height="auto"></a>
 </p>

<h1 style="text-align: center">Beatbot</h1>

Bot discord permettant aux utilisateurs d'être au courant des dernières musiques et albums sortis par leur artiste préféré.

### En détail

Grâce à la commande `/alert`, l'utilisateur va pouvoir rechercher un artiste grâce au champ de recherche.

Lorsque l'artiste voulu apparaît, il suffit de cliquer dessus pour faire apparaître un message de confirmation avec toutes les informations de l'artiste.

Une fois accepté, il ne reste plus qu'à attendre qu'il sorte une nouvelle musique ou un nouvel album pour être alerté par message. 🔔

## 🛠️ Installation et utilisation

Dupliquez le projet

```bash
  git clone https://github.com/HeineZo/beatbot
```

Une fois le projet dupliqué, dirigez vous dans le dossier et installez toutes les dépendences.

```bash
  npm install
```

### Utilisation

---

**⚠️Remarque⚠️**\
Pour lancer le bot, il vous faudra le `token` de connexion et l'ID du bot. \
Par sécurité, il ne sont pas disponible publiquement sur Github. \
Envoyez un message à `@Enzito#4885` sur Discord pour les obtenir.

---

\
Une fois les identifiants de connexion récupérés, déposez-les dans un fichier que vous nommerez soigneusement `config.json` à la racine du projet.

Ils devront être déclaré sous cette forme

```
  {
      "token": "[à remplacer]",
      "clientId": "[à remplacer]"
  }
```

Lancez ensuite le bot avec la commande suivante.

```bash
  npm run build
```

Si vous l'avez déjà build mais que vous avez besoin de le redémarrer, vous pouvez simplement le lancer avec cette commande.

```bash
  npm run dev
```

## ✨ Roadmap

-   [ ] Créer une plateforme web pour pouvoir gérer ses alertes plus facilement

-   [ ] Laisser la possibilité lors de l'installation du bot sur le serveur d'envoyer les notifications par DM ou sur le serveur

-   [ ] Envoyer des rappels des fonctionnalités du bot dans les channels du serveur à partir de mots clés (`alerte`, `rap`, `nouveau`...)

-   [ ] Tous les vendredis, envoyer une sélection d'albums/sons à écouter

## 💬 FAQ

#### 👉 Le bot est-il fonctionnel ?

Non pas encore, il devrait bientôt être héberger afin de pouvoir être tout le temps disponible et sera accompagné d'une base de données.

#### 👉 Est-ce que je peux écouter de la musique avec ?

Il s'agit d'un outil permettant d'être alerté dès qu'un artiste sors de nouvelles musiques ou d'albums.\
Cette fonctionnalité n'est pour l'instant pas envisagée.

#### 👉 D'où vient le nom ?

ChatGPT.

#### 👉 D'où vient l'idée ?

Étant un grand consommateur de rap, j'aime beaucoup écouter les derniers albums qui sortent afin d'être au cœur de l'engouement.\
Cependant j'ai toujours eu du mal à savoir quand un artiste que j'aimais bien sortait quelque chose.\
**J'ai donc voulu créer un outil permettant à n'importe qui de suivre ses artistes favoris.**

#### 👉 J'ai trouvé un bug, qu'est-ce que je peux faire ?

Tu peux m'envoyer un message ou directement demander à corriger le bug en suivant l'installation du bot localement.

> [Voir comment l'installer](#installation-et-utilisation)

## 🔗 Liens utiles

<div style="display: flex, justifyContent: space-evenly">
<a href="https://discordapp.com/users/Enzito#4885"><img src="https://img.shields.io/static/v1?label=Discord&message=Envoi+moi+un+message&color=%237289da&style=for-the-badge&logo=discord&logoColor=white" alt="Discord - Envoi moi un message"></a>
<a href="https://heinezo.github.io"><img src="https://img.shields.io/badge/mon_portfolio-222?style=for-the-badge&logo=ko-fi&logoColor=white" alt="Discord - Envoi moi un message"></a>
</div>
