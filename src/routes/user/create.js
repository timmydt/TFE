const bcrypt = require("bcrypt")
const Joi = require("joi")
const { prisma } = require("../../prisma")

async function createUser(req, res) {
  try {
    const password = req.body.password //je récupère le mot de passe entré par l'utilisateur
    const salt = await bcrypt.genSalt(10) //il génère le nombre de fois qu'il sera salé
    const hash = await bcrypt.hash(password, salt) //je le sale
    const mailSchema = Joi.string().email().required()
    const validateMail = mailSchema.validate(req.body.mail)

    const username = req.body.username
    const mail = req.body.mail

    if (validateMail.error) {
      return res.status(400).send("L'email est invalide")
    }

    //récupérer les champs "username" et "mail"

    //tester si ils existent déjà dans la base de données
    const resultUsername = await prisma.user.findUnique({
      where: {
        username: username
      }
    })
    const resultMail = await prisma.user.findUnique({
      where: {
        mail: mail
      }
    })
    //si username existe : 401
    if (resultUsername) {
      return res.status(401).send("Username already used by someone else")
    }
    //si mail existe : 402
    if (resultMail) {
      return res.status(402).send("Mail already used by someone else")
    }

    //si ok, créer

    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hash, //je poste le hash
        mail: req.body.mail,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        admin: false
      }
    })
    res.status(200).send("l'utilisateur a été ajouté dans la base de données")
  } catch (error) {
    res.status(400).send("Une erreur est survenue")
    console.log(error)
  }
}

module.exports = createUser
