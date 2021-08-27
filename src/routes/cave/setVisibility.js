const { prisma } = require("../../prisma")

async function setVisibility(req, res) {
  try {
    const { cave, users } = req.body

    await prisma.cave.update({
      where: {
        id: cave
      },
      data: {
        exportedTo: {
          connect: users.map(user => ({ id: user }))
        }
      }
    })

    res.status(200).send("Cave partagée")
  } catch (error) {
    console.log(error)
    res.status(400).send("Une erreur est survenue")
  }
}

module.exports = setVisibility
