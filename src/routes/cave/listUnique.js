const { prisma } = require("../../prisma")

async function listUnique(req, res) {
  try {
    const cave = await prisma.cave.findUnique({
      where: {
        id: parseInt(req.params.id)
      },
      include: {
        bottles: true
      }
    })
    res.status(200).send(cave)
  } catch (error) {
    console.log(error)
    res.status(400).send("Une erreur est survenue")
  }
}

module.exports = listUnique
