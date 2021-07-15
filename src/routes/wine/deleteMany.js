const { prisma } = require("../../prisma");

async function deleteManyWines(req,res){
  // ton json en front = { wineIds: [1, 2, 3] }
  const wineIds = req.body.wineIds
  const batch = []

  for (let id of wineIds) {
    batch.push(prisma.wine.delete({
      where: {
        id: id
      }
    }))
  }
  await prisma.$transaction(batch)
  res.status(200).send("tous les vins ont été supprimés")
}

module.exports = deleteManyWines
