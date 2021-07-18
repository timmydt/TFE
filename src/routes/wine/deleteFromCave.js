const { prisma } = require("../../prisma")

async function deleteFromCave(req, res) {
  try {
    await prisma.privateWine.delete({
      where: /*json au format { caves : { id: 1 }} */ {
        caves: req.body.caves.id
      }
    })

    res.status(200).send("Le vin a été supprimé de la cave")
  } catch (error) {
    res.status(400).send("erreur")
  }
}

module.exports = deleteFromCave
