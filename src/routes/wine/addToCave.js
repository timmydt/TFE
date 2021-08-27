const { prisma } = require("../../prisma")

async function addToCave(req, res) {
  try {
    // Array of wines
    const wines = req.body.wines
    const cave = Number(req.body.cave)
    const user = Number(req.user.id)

    // Recuperer le vin du catalogue
    const publicWines = await prisma.publicWine.findMany({
      where: {
        OR: wines.map(id => ({ id }))
      }
    })

    const postWine = await  prisma.$transaction(
      publicWines.map((publicWine) => (
        prisma.privateWine.create({
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
            cave: {
              connect: { id: cave }
            }
          }
        })
      ))
    )

    res.status(200).send("sa marchent")
  } catch (error) {
    res.status(400).send("Une erreur est survenue")
    console.log(error)
  }
}

module.exports = addToCave
