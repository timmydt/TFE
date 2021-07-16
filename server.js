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
const deletewine = require('./src/routes/wine/delete')

//---------------utilisateurs---------------------//

//Récupérer tous les utilisateurs présents dans la base de données 
app.get('/users', userRoutes.list)

//Poster un utilisateur dans la base de données
app.post('/users/create', userRoutes.createUser)

//Un utilisateur se log sur le serveur, on test si il existe et si il se log correctement
app.post('/users/login', userRoutes.login)

//------------------caves-------------------------//

//L'utilisateur peut créer des caves 
app.post('/cave/create', caveRoutes.createCave)

//L'utilisateur peut supprimer une cave
app.delete('/cave', caveRoutes.deleteCave)

//L'utilisateur peut consulter toutes ses propres caves. 
app.get('/cave', caveRoutes.list)

//L'utilisateur peut mettre à jour sa cave 
app.post('/cave/update',caveRoutes.updateCave)

//------------------notes-------------------------//

//L'utilisateur peut créer des notes 
app.post('/note', noteRoutes.createNote)

//L'utilisateur peut lister ses notes 
app.get('/note/list', noteRoutes.listNote)

//L'utilisateur peut supprimer une note
app.delete('/note/one', noteRoutes.deleteNote)

//L'utilisateur peut supprimer plusieurs notes 
app.delete('/note/many', noteRoutes.deleteManyNote)

//L'utilisateur peut mettre à jour une note 
app.post('/note/update', noteRoutes.updateNote)

//-------------------vins-------------------------//

//L'utilisateur peut créer des vins pour les poster directement dans une cave 
app.post('/wine/create', wineRoutes.createWine)

//L'utilisateur peut supprimer des vins 
app.delete('/wine/user', wineRoutes.deleteWine)

//un administrateur peut supprimer des vins, privés ou publics
app.delete('/wine/admin', wineRoutes.deleteWineAdmin)

//----------------raspberry-----------------------//



  



