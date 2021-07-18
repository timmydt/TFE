const { prisma } = require("../../prisma")
const bcrypt = require("bcrypt")

async function updatePwd(req, res) {
  try {
    const password = req.body.password
    const oldPassword = req.body.oldPassword

    const salt = await bcrypt.genSalt(10)
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id
      }
    })

    const exist = await bcrypt.compare(oldPassword, user.password)

    console.log(exist)

    if (exist) {
      const hash = await bcrypt.hash(password, salt)
      const user = await prisma.user.update({
        where: {
          id: req.user.id
        },
        data: {
          password: hash
        }
      })
      res.status(200).send("le mot de passe de l'utilisateur a été mise à jour")
    } else {
      res.status(400).send("le mdp rentré est incorrect")
    }
  } catch (error) {
    res.status(400).send("Une erreur est survenue")
    console.log(error)
  }
}

module.exports = updatePwd
