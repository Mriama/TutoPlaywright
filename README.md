# tuto playwright*

# Github Pages
GitHub Pages est un service de GitHub qui vous permet d'héberger des sites web directement à partir d'un dépôt GitHub. C'est une excellente option pour héberger des sites statiques, des blogs ou de la documentation de projet.

Cependant nous allons utiliser GitHub Pages pour héberger les rapports de tests générés par Playwright, comme par exemple les rapports Allure ou les rapports HTML de Playwright.

# Générer et Déployer Allure Report dans github actions 
1. Créer un fichier .yml dans github/workflows pour Exécuter les Tests et Générer des Rapports Allure (A voir dans mon fichier playwright-allure.yml)
2. Configurer GitHub Pages dans votre Dépôt
   1. Accéder aux Paramètres du Dépôt :
      Allez dans Settings (Paramètres) de votre dépôt sur GitHub.
   2. Configurer GitHub Pages :
      Allez dans settings depuis github. Puis dans la section "Pages" sous "Code and automation", définissez la source comme la branche 'gh-pages' que vous allez créer au préalable.
3. Pousser vos Changements sur GitHub
Après avoir configuré GitHub Actions et GitHub Pages, assurez-vous que tous vos fichiers sont engagés et poussés sur GitHub.
4. Vérification du Déploiement
GitHub Pages va automatiquement déployer le contenu de la branche gh-pages. Une fois le workflow terminé avec succès, vous pourrez accéder à vos rapports via l'URL de GitHub Pages qui devrait ressembler à :
https://votre-nom-utilisateur.github.io/nom-du-repository/
Possibilité d'y acceder directement en consultant depuis github le workflow dans 'ACTIONS' sous le tag de github-pages

# NB: Voir le fichier .yml et le package.json la partie "scripts"


# Envoie de notification avec le rapport Allure généré dans un canal de communication (ex: Slack )
1. Créer un Webhook Slack 
2. Ajouter le Webhook Slack aux Secrets GitHub
3. Mettre à jour ton fichier .yml en ajoutant la partie d'envoie de notification à Slack

# Voici un exemple de la configuration d'un webhook Slack et de la manière dont tu peux l'utiliser pour envoyer des notifications :
1. Créer un Webhook Slack
        Accède à Slack API: https://api.slack.com/
        Clique sur "Your Apps" dans le menu en haut à droite.
        Clique sur "Create New App" et sélectionne "From scratch".
        Donner un nom à ton application et choisir le workspace où elle sera installée, puis clique sur "Create App".
        Dans le menu de gauche, sous "Features", clique sur "Incoming Webhooks".
        Active les "Incoming Webhooks" en utilisant le bouton "Activate Incoming Webhooks".
        Clique sur "Add New Webhook to Workspace".
        Choisis un canal où les notifications seront envoyées et clique sur "Allow".
        Copie l'URL du webhook généré. Cela ressemble à quelque chose comme : https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX.

2. Ajouter le Webhook Slack à GitHub Secrets
        Va dans le dépôt GitHub.
        Accède à Settings > Secrets and variables > Actions.
        Clique sur "New repository secret".
        Nomme le secret, par exemple, SLACK_WEBHOOK_URL, et colle l'URL du webhook Slack que tu as copié.
        Clique sur "Add secret".

3. Faire un push pour déclencher l'execution des tests depuis github actions

# Exemple d'Utilisation du Webhook Slack dans un Workflow GitHub Actions
Voici comment utiliser le webhook Slack pour envoyer une notification après l'exécution des tests dans le fichier .yml :

- name: Notify Slack
        run: |
          curl -X POST -H 'Content-type: application/json' --data '{"text":"Allure Report is available at: https://<ton-nom-utilisateur>.github.io/<nom-du-repo>/"}' ${{ secrets.SLACK_WEBHOOK_URL }}

# Explication de l'Étape Notify Slack
curl -X POST : Utilise curl pour envoyer une requête HTTP POST.
-H 'Content-type: application/json' : Définit l'en-tête de la requête pour indiquer que le corps de la requête est en JSON.
--data '{"text":"Allure Report is available at: https://<ton-nom-utilisateur>.github.io/<nom-du-repo>/"}' : Envoie un payload JSON avec le message que tu souhaites publier sur Slack.
{{ secrets.SLACK_WEBHOOK_URL }} : Utilise le secret GitHub pour obtenir l'URL du webhook Slack.

# NB 1:
En configurant cela correctement, tu devrais recevoir une notification Slack chaque fois que le workflow GitHub Actions se termine, te fournissant l'URL du rapport Allure.

# NB 2:
Pour envoyer un message Slack via webhook avec un texte personnalisé et un <lien cliquable>, tu peux formater le message JSON comme suit :

run: |
  curl -X POST -H 'Content-type: application/json' --data '{"text":"The Allure Report is available at: <https://bapapemalick1code.github.io/playwright_end2end/|Allure report>"}' {{ secrets.SLACK_WEBHOOK_URL }}

# Explication
<URL|Text> : La syntaxe <URL|Text> permet d'afficher un texte cliquable dans Slack. Le texte entre | est ce qui sera visible, et l'URL entre < et > est le lien cliquable.