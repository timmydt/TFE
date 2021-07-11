//dependances
const express = require('express')
const app = express()
const port = 4000
const {PrismaClient} = require('@prisma/client')
const bcrypt = require('bcrypt')

//variables
const prisma = new PrismaClient()
app.use(express.urlencoded());
app.use(express.json());

//routes
app.listen(port, () => {
  console.log(`ça fonctionne et écoute à l'adresse http://localhost:${port}`)
})

app.get('/users', async function(req,res){
  const users = await prisma.user.findMany()
  res.send(users)
})

app.post('/users', async function(req,res){
  const password = req.body.password //je récupère le mot de passe entré par l'utilisateur
  const salt=await bcrypt.genSalt(10) //il génère le nombre de fois qu'il sera salé
  const hash=await bcrypt.hash(password, salt) //je le sale
  const user = await prisma.user.create({
    data: {
      username :  req.body.username,
      password :  hash, //je poste le hash 
      mail : req.body.mail,
      first_name : req.body.first_name,
      last_name : req.body.last_name,
    },
  })
  res.send('bien reçu')
})

app.post('/login', async function(req,res){
  //récupérer le mot de passe et l'username'
  const username = req.body.username
  const password = req.body.password
  //check si l'utilisateur existe (comparaison username et présence dans la db)
  const result = await prisma.user.findFirst({
    where: {
      username : username
    }
  })
  console.log(result)

  //si il existe, je compare le mot de passe et le hash de l'user
  if (result != null){
    console.log("l'utilsiateur existe")
    const exist = await bcrypt.compare(password, result.password) 
    if (exist==true){
      res.send('il est le bon mot de passe et est testé')
    }
    else {
      res.send("il n'est pas le bon mot de passe et est testé")
    }
  }
  else {
    res.send("l'utilisateur n'existe pas et peut être créé")
  }
  //si le mdp correspond, je valide la connexion 
  //si le mdp ne correspond pas, je renvoie une erreur mentionnant un pb d'auth
})