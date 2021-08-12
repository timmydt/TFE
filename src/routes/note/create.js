const { prisma } = require("../../prisma")

async function createNote(req, res) {
  try {
    const note = await prisma.note.create({
      data: {
        name: req.body.name,
        note: req.body.note,
        picture: req.body.picture,
        date: req.body.date,
        creator: {
          connect: {
            id: req.user.id
          }
        }
      }
    })
    res.status(200).send("la note a été créée")
  } catch (error) {
    res.status(400).send("Une erreur est survenue")
    console.log(error)
  }
}

module.exports = createNote
