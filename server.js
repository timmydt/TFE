//--------------dependances----------------------//

require('dotenv').config()

const jwt = require ('jsonwebtoken')
const { prisma } = require('./src/prisma')
const express = require('express')
const { app } = require('./src/express')
const { jwtMiddleware } = require('./src/middlewares/jwt')

//----------------variables----------------------
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(jwtMiddleware)

//---Lancement du serveur et écoute sur le port déclaré dans les dépendances----------
app.listen(process.env.SERVER_PORT, () => {
  console.log(`ça fonctionne et écoute à l'adresse http://localhost:${process.env.SERVER_PORT}`)
})


//-------------------routes----------------------

const userRoutes = require('./src/routes/user')
const caveRoutes = require('./src/routes/cave')
const noteRoutes = require('./src/routes/note')
const wineRoutes = require('./src/routes/wine')

//---------------FONCTIONNELLES-------------------

//Récupérer tous les utilisateurs présents dans la base de données 
app.get('/users', userRoutes.list)
//Poster un utilisateur dans la base de données
app.post('/users', userRoutes.createUser)
//Un utilisateur se log sur le serveur, on test si il existe et si il se log correctement
app.post('/login', userRoutes.login)
//L'utilisateur peut consulter toutes ses propres caves. 
app.get('/list', caveRoutes.list)


//-----------PAS FONCTIONNELLES---------------------

  /*ajouter des bouteilles de vin dans les caves des utilisateurs. Il peut selectionner une des bouteilles déjà présente dans la db, 
  ou en créer une nouvelle en remplissant les champs. Peu importe son choix, il devra au final rentrer manuellement une date de consommation
  durant laquelle la bouteille ajoutée devra être consommée */
  
  //!!! PAS FONCTIONNEL !!!
  app.post('/wine', wineRoutes.createWine)

  /*le serveur envoie une notification à l'utilisateur si la date actuelle est 8 jours avant expiration d'une bouteille, et également si 
  la date actuelle est égale à la date de consommation d'une bouteille*/

  /*afficher les bouteilles d'une cave selectionnée. (en fonction de son id ? En fonction de son nom ?) Il faut pouvoir 
  premièrement voir toutes les caves possédées par l'utilisateur afin de pouvoir selectionner la cave voulue à afficher*/

  //trier l'affichage des bouteilles par filtres 

  //générer un QR Code qui permet d'accorder le droit à un utilisateur ayant scanné mon code d'accéder à la lecture de ma cave 

  //selectionner un utilisateur ayant le droit de lire ma cave 

  /*Permettre à un utilisateur de créer des historiques de dégustations : il aura un bouton "historique", pourra selectionner l'option 
  "nouvelle dégustation" qui lui permettra de selectionner ou créer une bouteille, et d'y ajouter des notes (chaine de caractère). Il faudra
  également qu'il puisse récupérer toutes ses notes, afin de les lire ou les supprimer. */

  //discuter avec un deuxième serveur (envoyer une notification et recevoir une réponse) + sécurité 

  //reconnaissance de la photo de l'étiquette lors de la dégustation




  



