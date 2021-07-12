//--------------dependances----------------------
const express = require('express')
const app = express()
const port = 4000
const {PrismaClient} = require('@prisma/client')
const bcrypt = require('bcrypt')
const jwt = require ('jsonwebtoken')
const expressjwt = require('express-jwt')

//----------------variables----------------------
const prisma = new PrismaClient()
app.use(express.urlencoded());
app.use(express.json());
app.use(expressjwt({
  secret: 'signedtoken',
  algorithms: ['HS256'],
  credentialsRequired: false,
  getToken: function fromHeaderOrQuerystring (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }
}).unless({path:["/login","/users"]}));

//----------Lancement du serveur et écoute sur le port déclaré dans les dépendances----------
app.listen(port, () => {
  console.log(`ça fonctionne et écoute à l'adresse http://localhost:${port}`)
})

//-------------------routes----------------------

//Récupérer tous les utilisateurs présents dans la base de données 
app.get('/users', async function(req,res){
  const users = await prisma.user.findMany({include:{caves:true}})
  res.status(200).send(users)
})

//Poster un utilisateur dans la base de données
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
  res.status(200).send()
})

//Un utilisateur se log sur le serveur, on test si il existe et si il se log correctement
app.post('/login', async function(req,res){
  //récupérer le mot de passe et l'username'
  const username = req.body.username
  const password = req.body.password
  //check si l'utilisateur existe (comparaison username et présence dans la db)
  const result = await prisma.user.findUnique({
    where: {
      username : username
    }
  })
  console.log(result)

  //si il existe, je compare le mot de passe et le hash de l'user dans la db
  if (result != null){
    console.log("l'utilsiateur existe")
    const exist = await bcrypt.compare(password, result.password) 
    //si le mdp correspond, je valide la connexion 
    if (exist==true){
      console.log('il est le bon mot de passe et est testé')
      //on attribue à l'utilisateur un token qui reprend son id et son nom si c'est le bon mdp
      const utilisateur = {
        id: result.id,
        username : result.username
      };
      const token = jwt.sign({
        id: result.id,
        username : result.username
      }, 'signedtoken', { expiresIn: '1h' });
      res.status(200).send(token)
  }
  //Si le mot de passe n'est pas bon, on prévient l'utilisateur que son mot de passe ou son login entré est incorrect 
 else {
      res.status(403).send("Le nom d'utilisateur ou le mot de passe entré est incorrect")
    }
  }
  //Si le nom de compte n'existe pas, on prévient l'utilisateur que son mot de passe ou son login entré est incorrect 
 else {
    res.status(403).send("Le nom d'utilisateur ou le mot de passe entré est incorrect")
  }
})

  //l'utilisateur peut créer des caves
  app.post('/cave', async function(req,res){
    const cave = await prisma.cave.create({
      data: {
        name :  req.body.name,
        creator : {connect: {id: req.user.id}}
      },
    })
    res.status(200).send("La cave a correctement été créée")
  })

  //L'utilisateur peut consulter toutes ses propres caves 
  app.get('/cave', async function(req,res){
    const caves = await prisma.cave.findMany({where:{creatorId:req.user.id}})
    res.status(200).send("Toutes les caves de l'utilisateur ont été renvoyées")
  })

  //ajouter des bouteilles de vin dans les caves des utilisateurs 
  
  //!!! PAS FONCTIONNEL !!!
  app.post('/wine', async function(req,res){
    const wine = await prisma.user.create({
      data: {
        name :  req.body.name,
        caves : {connect: [{id: req.body.cave}]}
      },
    })
    res.status(200).send("les données ont été ajoutées")
  })