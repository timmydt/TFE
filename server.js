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
const raspRoutes = require('./src/routes/raspberry')

//---------------utilisateurs---------------------//

//Récupérer tous les utilisateurs présents dans la base de données 
app.get('/getUsers', userRoutes.list)

//Poster un utilisateur dans la base de données
app.post('/postUsers', userRoutes.createUser)

//Un utilisateur se log sur le serveur, on test si il existe et si il se log correctement
app.post('/loginUsers', userRoutes.login)

//------------------caves-------------------------//

//L'utilisateur peut créer des caves 
app.post('/createCave', caveRoutes.createCave)

//L'utilisateur peut supprimer une cave
app.delete('/deleteCave', caveRoutes.deleteCave)

//L'utilisateur peut consulter toutes ses propres caves. 
app.get('/listCave', caveRoutes.list)

//L'utilisateur peut mettre à jour sa cave 
app.post('/updateCave',caveRoutes.updateCave)

//------------------notes-------------------------//

//L'utilisateur peut créer des notes 
app.post('/postNote', noteRoutes.createNote)

//L'utilisateur peut lister ses notes 
app.get('/listNote', noteRoutes.listNote)

//L'utilisateur peut supprimer une note
app.delete('/deleteNote', noteRoutes.deleteNote)

//L'utilisateur peut supprimer plusieurs notes 
app.delete('/deleteManyNotes', noteRoutes.deleteManyNote)

//L'utilisateur peut mettre à jour une note 
app.post('/updateNote', noteRoutes.updateNote)

//-------------------vins-------------------------//

//L'utilisateur peut créer des vins pour les poster directement dans une cave 
app.post('/createWine', wineRoutes.createWine)

//----------------raspberry-----------------------//



  



