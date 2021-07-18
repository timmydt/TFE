const { prisma } = require("../../prisma")

async function updateCave(req, res) {
  try {
    const cave = await prisma.cave.update({
      where: {
        id: req.body.id
      },
      data: {
        name: req.body.name
      }
    })

    res.status(200).send("la cave a été mise à jour")
  } catch {
    res.status(400).send("Une erreur est survenue")
  }
}

module.exports = updateCave
