const { prisma } = require("../../prisma")

async function addToCave(req, res) {
  try {
    const wine = req.body.wine
    const cave = req.body.cave
    const user = req.user.id

    // Recuperer le vin du catalogue
    const publicWine = await prisma.publicWine.findUnique({
      where: {
        id: wine
      }
    })

    const postWine = await prisma.privateWine.create({
      data: {
        name: publicWine.name,
        food: publicWine.food,
        grapes: publicWine.grapes,
        maker: publicWine.maker,
        picture: publicWine.picture,
        year: publicWine.year,
        creator: {
          connect: { id: user }
        },
        caves: {
          connect: [{ id: cave }]
        }
      }
    })

    res.status(200).send("sa marchent")
  } catch (error) {
    res.status(400).send("Une erreur est survenue")
    console.log(error)
  }
}

module.exports = addToCave
