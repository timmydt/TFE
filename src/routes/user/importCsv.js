const { csv2jsonAsync } = require("json-2-csv")
const { prisma } = require("../../prisma")

async function importCsv(req, res) {
  try {
    const { caveCsv: [cave], wineCsv: [wine] } = req.files
    const [caves, wines] = await Promise.all([
      csv2jsonAsync(cave.buffer.toString()),
      csv2jsonAsync(wine.buffer.toString())
    ])

    await prisma.cave.createMany({
      data: caves.map(cave => ({
        id: cave.id,
        name: cave.name,
        creatorId: cave.creatorId
      })),
      skipDuplicates: true
    })

    await prisma.privateWine.createMany({
      data: wines.map(wine => ({
        id: wine.id,
        name: wine.name,
        best_before: wine.best_before ? new Date(wine.best_before) : null,
        food: wine.food,
        grapes: wine.grapes,
        maker: wine.maker,
        picture: wine.picture,
        year: wine.year,
        quantity: wine.quantity,
        rating: wine.rating,
        creatorId: wine.creatorId,
        caveId: wine.caveId
      })),
      skipDuplicates: true
    })
    
    res.status(200).send({
      message: 'Data importées avec succès!'
    })
  } catch(e) {
    res.status(400).send("Une erreur inconnue est survenue")
  }
}

module.exports = importCsv
