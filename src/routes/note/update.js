const { prisma } = require("@prisma/client")

async function updateNote(req, res) {
  try {
    const cave = await prisma.cave.update({
      where: {
        id: req.body.id
      },

      data: {
        name: req.body.name,
        note: req.body.note,
        picture: req.body.picture,
        date: req.body.date
      }
    })

    res.status(200).send("la note a été mise à jour")
  } catch {
    res.status(400).send("Une erreur est survenue")
  }
}

module.exports = updateNote
