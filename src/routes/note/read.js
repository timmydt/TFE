const { prisma } = require("../../prisma")

async function readNote(req, res) {
  try {
    const note = await prisma.note.findUnique({
      where: { id: req.note.id }
    })
    res.status(200).send(note)
  } catch {
    res.status(400).send("Une erreur est survenue")
  }
}
module.exports = readNote
