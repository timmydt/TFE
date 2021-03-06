//--------------dependances----------------------//

require("dotenv").config()
const jwt = require("jsonwebtoken")
const { prisma } = require("./src/prisma")
const express = require("express")
const { app } = require("./src/express")
const { jwtMiddleware } = require("./src/middlewares/jwt")
const cors = require("cors")
const multer = require("multer")
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // Limite de 5mb
  }
})

//----------------variables----------------------

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(jwtMiddleware)

//---Lancement du serveur et écoute sur le port déclaré dans les dépendances----------
const corsOptions = {
  origin: process.env.SRV_URL,
  optionsSuccessStatus: 200
}

app.use(cors())

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
app.post("/users", userRoutes.list)

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

// Export des csv
app.get("/users/csv", userRoutes.getCsv)

// Import des CSV
app.post(
  '/users/csv',
  upload.fields([{ name: 'caveCsv', maxCount: 1 }, { name: 'wineCsv', maxCount: 1 }]),
  userRoutes.importCsv
)

//------------------caves-------------------------//

//L'utilisateur peut créer des caves
app.post("/cave/create", caveRoutes.createCave)

//L'utilisateur peut supprimer une cave
app.delete("/cave", caveRoutes.deleteCave)

//L'utilisateur peut consulter toutes ses propres caves.
app.get("/cave/list", caveRoutes.list)

//L'utilisateur peut mettre à jour sa cave
app.put("/cave/update", caveRoutes.updateCave)

// Recupere les caves exportées
app.get('/sharedCaves', caveRoutes.shared)

// Récupère une cave
app.get("/cave/:id", caveRoutes.listUnique)

// Partage les caves a d'autre users
app.post('/cave/share', caveRoutes.setVisibility)


//------------------notes-------------------------//

//L'utilisateur peut créer des notes
app.post("/note", noteRoutes.createNote)

// Pre upload une image pour compléter les champs
app.post("/note/picture", upload.single("picture"), noteRoutes.uploadPicture)

//L'utilisateur peut lister ses notes
app.get("/note/list", noteRoutes.listNote)

//L'utilisateur peut supprimer une note
app.delete("/note/:id", noteRoutes.deleteNote)

//L'utilisateur peut supprimer plusieurs notes
app.delete("/note/many", noteRoutes.deleteManyNote)

//L'utilisateur peut mettre à jour une note
app.put("/note/update", noteRoutes.updateNote)

//L'utilisateur peut lire une note en particulier
app.get("/note/:id", noteRoutes.readNote)

//-------------------vins-------------------------//

// Récupèree un vin
app.get('/wine/:id', wineRoutes.find)

// Met à jour un vin
app.put('/wine', upload.single("picture"), wineRoutes.update)

// Récupère tout les vins public
app.post('/wines', wineRoutes.list)

// Note un vin
app.post('/wine/rate', wineRoutes.rate)

//L'utilisateur peut créer des vins pour les poster directement dans une cave
app.post("/wine/create", upload.single("picture"), wineRoutes.createWine)

//L'utilisateur peut supprimer des vins
app.delete("/wine/user", wineRoutes.deleteWine)

//un vin peut être supprimé d'une cave
app.delete("/wine/cave/:id", wineRoutes.deleteFromCave)

//un utilisateur peut supprimer plusieurs vins en même temps
app.delete("/wine/many", wineRoutes.deleteMany)

//un vin peut être ajouté dans une ou plusieurs caves
app.post("/wine/cave/add", wineRoutes.addToCave)

//----------------raspberry-----------------------//
