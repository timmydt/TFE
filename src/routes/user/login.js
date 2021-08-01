const { prisma } = require("../../prisma")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function login(req, res) {
  try {
    //récupérer le mot de passe et l'username'
    const username = req.body.username
    const password = req.body.password
    //check si l'utilisateur existe (comparaison username et présence dans la db)
    const result = await prisma.user.findUnique({
      where: {
        username: username
      }
    })
    //si il existe, je compare le mot de passe et le hash de l'user dans la db
    if (result != null) {
      const exist = await bcrypt.compare(password, result.password)
      //si le mdp correspond, je valide la connexion
      if (exist == true) {
        //on attribue à l'utilisateur un token qui reprend son id et son nom si c'est le bon mdp
        const user = {
          id: result.id,
          username: result.username,
          admin: result.admin
        }
        const token = jwt.sign(user, process.env.JWT_SECRET, {
          expiresIn: "3h"
        })
        res.status(200).send({ token })
      }
      //Si le mot de passe n'est pas bon, on prévient l'utilisateur que son mot de passe ou son login entré est incorrect
      else {
        res
          .status(403)
          .send("Le nom d'utilisateur ou le mot de passe entré est incorrect")
      }
    }
    //Si le nom de compte n'existe pas, on prévient l'utilisateur que son mot de passe ou son login entré est incorrect
    else {
      res
        .status(403)
        .send("Le nom d'utilisateur ou le mot de passe entré est incorrect")
    }
  } catch (error) {
    res.status(400).send("Une erreur est survenue")
    console.log(error)
  }
}

module.exports = login
