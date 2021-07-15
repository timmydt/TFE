const { prisma } = require("../../prisma");

async function deleteManyNote(req,res){
  // ton json en front = { notes: [1, 2, 3] }
  const noteIds = req.body.notes
  const batch = []

  for (let id of noteIds) {
    batch.push(prisma.note.delete({
      where: {
        id: id
      }
    }))
  }
  await prisma.$transaction(batch)
  res.status(200).send("toutes les notes ont été supprimés")
}

module.exports = deleteManyNote
