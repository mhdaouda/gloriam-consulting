# Configuration Google Sheets — Gloriam Consulting

Dashboard : `https://www.gloriam-consulting.com/admin/dashboard.html`  
Campagnes e-mail : `https://www.gloriam-consulting.com/admin/mail-campaigns.html`

Temps estimé : **15–20 minutes**. Utilisez le **même compte Google** que pour Gmail (`contact@gloriam-consulting.com` ou votre compte admin).

Après déploiement du script Web App, renseignez l’URL **à deux endroits** :
1. `public/js/gloriam-api-config.js` → `baseUrl`
2. `.env.local` → `NEXT_PUBLIC_GLORIAM_API_URL=` (même URL, pour le site Next.js)

---

## Étape 1 — Créer la feuille Google

1. Ouvrez [https://sheets.google.com](https://sheets.google.com)
2. Cliquez **+ Blank** (feuille vide)
3. Renommez en haut : **Gloriam Consulting Admin**
4. Laissez l’onglet « Feuille 1 » tel quel pour l’instant (le script créera **Contacts** et **Visits**)

---

## Étape 2 — Ouvrir Apps Script

### Plan A (depuis la feuille) — si ça marche

1. Dans **Gloriam Consulting Admin** : **Extensions** → **Apps Script**
2. Un onglet `script.google.com` s’ouvre
3. Renommez le projet : **Gloriam API**

### Plan B — si erreur « Impossible d'ouvrir le fichier » (souvent 2 comptes Google)

L’URL avec `authuser=1` = mauvais compte ou conflit de sessions.

1. **Fermez** l’onglet en erreur
2. Ouvrez **https://script.google.com/home** (connecté avec le **même** compte que la feuille)
3. **Nouveau projet** → renommez **Gloriam API**
4. Dans la feuille **Gloriam Consulting Admin**, copiez l’ID dans l’URL :
   ```
   https://docs.google.com/spreadsheets/d/ICI_LA_LONGUE_ID/edit
   ```
   (la partie entre `/d/` et `/edit`)
5. Apps Script → engrenage ⚙️ → **Propriétés du script** → ajoutez :
   - `SPREADSHEET_ID` = cet ID
   - (vous ajouterez `ADMIN_PASSWORD` à l’étape 5)

Puis continuez à l’étape 3 (coller le code) dans **ce** projet script.google.com.

**Astuce compte :** en navigation privée, connectez-vous **uniquement** avec `daoudayinde@gmail.com`, puis refaites Extensions → Apps Script.

---

## Étape 3 — Coller le code

1. Dans l’éditeur, **supprimez tout** le contenu de `Code.gs` (souvent `function myFunction() { ... }`)
2. Sur votre ordinateur, ouvrez le fichier du repo :
   ```
   public/admin/google-apps-script/GloriamAPI.gs
   ```
3. **Sélectionnez tout** (Ctrl+A / Cmd+A) → **Copier**
4. **Collez** dans Apps Script
5. Cliquez **Enregistrer** (icône disquette) ou Ctrl+S

---

## Étape 4 — Créer les onglets Contacts / Visits

1. Dans Apps Script, en haut, menu déroulant des fonctions : choisissez **`setupSheets`**
2. Cliquez **Exécuter** (▶)
3. **Première fois** : Google demande des autorisations
   - Cliquez **Examiner les autorisations**
   - Choisissez votre compte Google
   - Si « Google n’a pas validé cette application » → **Paramètres avancés** → **Accéder à Gloriam API (non sécurisé)**  
     (c’est normal : c’est **votre** script sur **votre** feuille)
   - Autorisez l’accès à la feuille de calcul
4. Attendez **Exécution terminée** (barre en bas)
5. Retournez dans **Google Sheets** : vous devez voir 2 onglets :
   - **Contacts** (colonnes : id, created_at, source, name, email, …)
   - **Visits** (colonnes : id, created_at, session_id, page_path, …)

Si les onglets n’apparaissent pas, ré-exécutez `setupSheets`.

---

## Étape 5 — Propriétés du script

Apps Script → engrenage ⚙️ → **Paramètres du projet** → **Propriétés du script** :

| Propriété | Obligatoire | Exemple |
|-----------|-------------|---------|
| `ADMIN_PASSWORD` | Oui | votre mot de passe dashboard |
| `SPREADSHEET_ID` | Oui si **Plan B** (script sur script.google.com) | id copié depuis l’URL de la feuille |
| `SPREADSHEET_ID` | Non si **Plan A** (ouvert depuis Extensions) | — |

Enregistrez les propriétés.

> Ce mot de passe servira sur `admin/dashboard.html` — ce n’est **pas** le mot de passe Google.

---

## Étape 6 — Déployer l’application web

1. Apps Script → bouton bleu **Déployer** → **Nouveau déploiement**
2. Cliquez l’icône **engrenage** ⚙️ à côté de « Sélectionner le type » → **Application web**
3. Remplissez :
   - **Description** : `Gloriam API v1`
   - **Exécuter en tant que** : **Moi** (votre email)
   - **Qui a accès** : **Tout le monde** (obligatoire pour que le site puisse appeler l’API)
4. **Déployer**
5. Autorisez à nouveau si demandé
6. **Copiez l’URL de l’application web** — elle ressemble à :
   ```
   https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxxxxx/exec
   ```
   ⚠️ Elle doit se terminer par **`/exec`** (pas `/dev`)

Gardez cette URL dans un fichier notes : vous en aurez besoin à l’étape 7.

---

## Étape 7 — Brancher le portfolio

1. Ouvrez dans le projet : `js/gloriam-api-config.js`
2. Remplacez par votre URL (exemple) :

```javascript
window.GLORIAM_API = {
    baseUrl: 'https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxxxxx/exec'
};
```

3. Enregistrez le fichier
4. Dans le terminal (dossier du portfolio) :

```bash
git add js/gloriam-api-config.js
git commit -m "config: URL Google Apps Script admin portfolio"
git push
```

5. Attendez **2–5 minutes** (déploiement GitHub Pages)

---

## Campagnes e-mail et suivi des ouvertures

- Module : `admin/mail-campaigns.html` (après connexion dashboard)
- Chaque e-mail HTML contient un **pixel invisible** ; quand le destinataire ouvre le mail, le compteur **Ouverts** augmente
- Feuilles Google : **MailCampaigns**, **MailRecipients**
- Après mise à jour du script : exécuter **`setupSheets`** puis **nouveau déploiement** Web App

## Mise à jour du script (campagnes e-mail, déconnexion)

Après une mise à jour de `GloriamAPI.gs` dans le repo :

1. Recopiez le fichier dans Apps Script → **Enregistrer**
2. **Déployer** → **Gérer les déploiements** → ✏️ → **Nouvelle version** → **Déployer**
3. L’URL `/exec` reste la même

Propriétés optionnelles :

| Propriété | Usage |
|-----------|--------|
| `MAIL_FROM_NAME` | Nom affiché comme expéditeur (ex. Mohamed DAOUDA) |
| `CAMPAIGN_TEST_EMAIL` | E-mail pour le bouton « Envoyer un test » |

---

## Étape 8 — Tester

### Test A — Dashboard

1. Ouvrez : [https://www.daoudayinde.com/admin/dashboard.html](https://www.daoudayinde.com/admin/dashboard.html)
2. Entrez le mot de passe de l’**étape 5**
3. Vous devez voir le dashboard (stats à 0 si pas encore de données)

### Test B — Enregistrement d’une visite

1. Ouvrez la page d’accueil du portfolio dans un **onglet privé**
2. Attendez 5 secondes
3. Dans Google Sheets → onglet **Visits** → une **nouvelle ligne** doit apparaître

### Test C — Formulaire contact

1. Page Contact → envoyez un message test
2. Vous recevez l’email (FormSubmit) **et** une ligne dans **Contacts**

---

## Dépannage

| Problème | Solution |
|----------|----------|
| « API non configurée » sur le dashboard | `baseUrl` vide ou pas encore poussé sur GitHub → refaire étape 7 |
| « Mot de passe incorrect » | Vérifier `ADMIN_PASSWORD` dans Propriétés du script (orthographe exacte) |
| « Session expirée » | Se reconnecter (session 24 h) |
| Aucune ligne dans Visits | URL `/exec` incorrecte ; ou déploiement « Moi » + « Tout le monde » mal configuré |
| « Impossible d'ouvrir le fichier » sur Apps Script | **Plan B** : script.google.com/home + propriété `SPREADSHEET_ID` ; ou 1 seul compte Google |
| Erreur après modification du script `.gs` | **Déployer** → **Gérer les déploiements** → ✏️ → **Nouvelle version** → **Déployer** |
| Autorisation refusée | Ré-exécuter `setupSheets` et accepter toutes les autorisations |

---

## Récapitulatif

| Élément | Où |
|--------|-----|
| Données brutes | Feuille Google **Gloriam Consulting Admin** |
| Dashboard | `https://www.daoudayinde.com/admin/dashboard.html` |
| Mot de passe | Propriété script `ADMIN_PASSWORD` |
| URL API | `js/gloriam-api-config.js` → `baseUrl` |
| Code serveur | `admin/google-apps-script/GloriamAPI.gs` |

---

## Besoin d’aide ?

Envoyez à l’assistant (sans publier le mot de passe) :
- Capture de l’écran **Déploiement** (URL masquée en partie si vous voulez)
- Message d’erreur exact du dashboard
- Confirmation : onglets Contacts/Visits visibles ou non
