const bcrypt = require("bcrypt")
const { prisma } = require("../../prisma")

async function createUser(req, res) {
  try {
    const password = req.body.password //je récupère le mot de passe entré par l'utilisateur
    const salt = await bcrypt.genSalt(10) //il génère le nombre de fois qu'il sera salé
    const hash = await bcrypt.hash(password, salt) //je le sale
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hash, //je poste le hash
        mail: req.body.mail,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        admin: req.body.admin
      }
    })
    res.status(200).send("l'utilisateur a été ajouté dans la base de données")
  } catch {
    res.status(400).send("Une erreur est survenue")
  }
}

module.exports = createUser
