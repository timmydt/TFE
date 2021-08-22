const { prisma } = require("../../prisma")

async function updateCave(req, res) {
  try {
    const cave = await prisma.cave.update({
      where: {
        id: Number(req.body.id)
      },
      data: {
        name: req.body.name
      }
    })

    res.status(200).send("la cave a été mise à jour")
  } catch(err) {
    console.log(err)
    res.status(400).send("Une erreur est survenue")
  }
}

module.exports = updateCave
