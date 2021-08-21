//--------------dependances----------------------//

require("dotenv").config()
const jwt = require("jsonwebtoken")
const { prisma } = require("./src/prisma")
const express = require("express")
const { app } = require("./src/express")
const { jwtMiddleware } = require("./src/middlewares/jwt")
const cors = require("cors")

//----------------variables----------------------

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(jwtMiddleware)

//---Lancement du serveur et écoute sur le port déclaré dans les dépendances----------
const corsOptions = {
  origin: process.env.SRV_URL,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

app.listen(process.env.SERVER_PORT, () => {
  console.log("srv started")
})

//-------------------routes----------------------

const userRoutes = require("./src/routes/user")
const caveRoutes = require("./src/routes/cave")
const noteRoutes = require("./src/routes/note")
const wineRoutes = require("./src/routes/wine")
const raspRoutes = require("./src/routes/raspberry")

//---------------utilisateurs---------------------//

//Récupérer tous les utilisateurs présents dans la base de données
app.get("/users", userRoutes.list)

//Poster un utilisateur dans la base de données
app.post("/users/create", userRoutes.createUser)

//Un utilisateur se log sur le serveur, on test si il existe et si il se log correctement
app.post("/users/login", userRoutes.login)

//Un utilisateur peut modifier manuellement son mot de passe
app.post("/users/updatePwd", userRoutes.updatePwd)

//récupérer un mot de passe sur un adresse mail
app.post(
  "/users/recoverPassword",

  userRoutes.recoverPassword
)
app.post("/users/resetPassword", userRoutes.resetPassword)

app.get("/users/csv", userRoutes.getCsv)
//------------------caves-------------------------//

//L'utilisateur peut créer des caves
app.post("/cave/create", caveRoutes.createCave)

//L'utilisateur peut supprimer une cave
app.delete("/cave", caveRoutes.deleteCave)

//L'utilisateur peut consulter toutes ses propres caves.
app.get("/cave/list", caveRoutes.list)

//L'utilisateur peut mettre à jour sa cave
app.post("/cave/update", caveRoutes.updateCave)

//------------------notes-------------------------//

//L'utilisateur peut créer des notes
app.post("/note", noteRoutes.createNote)

//L'utilisateur peut lister ses notes
app.get("/note/list", noteRoutes.listNote)

//L'utilisateur peut supprimer une note
app.delete("/note/one", noteRoutes.deleteNote)

//L'utilisateur peut supprimer plusieurs notes
app.delete("/note/many", noteRoutes.deleteManyNote)

//L'utilisateur peut mettre à jour une note
app.post("/note/update", noteRoutes.updateNote)

//L'utilisateur peut lire une note en particulier
app.get("/note/read", noteRoutes.readNote)

//-------------------vins-------------------------//

//L'utilisateur peut créer des vins pour les poster directement dans une cave
app.post("/wine/create", wineRoutes.createWine)

//L'utilisateur peut supprimer des vins
app.delete("/wine/user", wineRoutes.deleteWine)

//un vin peut être supprimé d'une cave
app.delete("/wine/cave", wineRoutes.deleteFromCave)

//un utilisateur peut supprimer plusieurs vins en même temps
app.delete("/wine/many", wineRoutes.deleteMany)

//un vin peut être ajouté dans une ou plusieurs caves
app.post("/wine/cave/add", wineRoutes.addToCave)

//----------------raspberry-----------------------//
