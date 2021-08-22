const { prisma } = require("../../prisma")

async function readNote(req, res) {
  console.log(req.params.id)
  try {
    const note = await prisma.note.findUnique({
      where: { id: Number(req.params.id) }
    })
    res.status(200).send(note)
  } catch {
    res.status(400).send("Une erreur est survenue")
  }
}
module.exports = readNote
