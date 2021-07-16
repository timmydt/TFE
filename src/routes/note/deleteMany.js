const { prisma } = require("../../prisma");



try{
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
}

catch {
  res.status(400).send('Une erreur est survenue')
}


module.exports = deleteManyNote
