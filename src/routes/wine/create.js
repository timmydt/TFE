const { prisma } = require("../../prisma")

async function createWine(req, res) {
  try {
    const wine = await prisma.privateWine.create({
      data: {
        name: req.body.name,
        best_before: req.body.best_before,
        food: req.body.food,
        grapes: req.body.grapes,
        maker: req.body.maker,
        picture: req.body.picture,
        year: req.body.year,
        creator: { connect: req.user.id }
      }
    })
    res.status(200).send("La bouteille a été créée")
  } catch {
    res.status(400).send("Une erreur est survenue")
  }
}

module.exports = createWine
