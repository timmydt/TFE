const { prisma } = require("../../prisma")

async function updateNote(req, res) {
  console.log(req.body)
  try {
    const cave = await prisma.note.update({
      where: {
        id: Number(req.body.id)
      },
      data: {
        name: req.body.name,
        note: req.body.note,
        picture: req.body.picture
      }
    })

    res.status(200).send("la note a été mise à jour")
  } catch(err) {
    console.log(err)
    res.status(400).send("Une erreur est survenue")
  }
}

module.exports = updateNote
