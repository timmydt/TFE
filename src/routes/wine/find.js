const { prisma } = require("../../prisma")

async function find(req, res) {
  try {
    const wine = await prisma.privateWine.findUnique({
      where: {
        id: Number(req.params.id)
      }
    })

    res.status(200).send(wine)
  } catch (error) {
    console.log(error)

    res.status(400).send("erreur")
  }
}

module.exports = find
