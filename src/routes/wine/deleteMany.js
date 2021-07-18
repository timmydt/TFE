const { prisma } = require("../../prisma")

async function deleteManyWines(req, res) {
  try {
    // ton json en front = { wineIds: [1, 2, 3] }
    const wineIds = req.body.wineIds
    const batch = []

    for (let id of wineIds) {
      batch.push(
        prisma.privateWine.delete({
          where: {
            id: id
          }
        })
      )
    }
    await prisma.$transaction(batch)
    res.status(200).send("tous les vins ont été supprimés")
  } catch {
    res.status(400).send("Une erreur est survenue")
  }
}

module.exports = deleteManyWines
