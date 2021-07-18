const { prisma } = require("../../prisma")

async function list(req, res) {
  try {
    const caves = await prisma.cave.findMany({
      where: {
        creatorId: req.user.id
      },
      include: {
        bottles: true
      }
    })
    res.status(200).send(caves)
  } catch (error) {
    console.log(error)
    res.status(400).send("Une erreur est survenue")
  }
}

module.exports = list
