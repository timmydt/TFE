const { prisma } = require("../../prisma")

async function deleteNote(req,res){
    const deleteNote = await prisma.note.delete({
        where: {
          id: req.body.id,
        },
      })
    res.status(200).send("La note a été supprimée")
  }
    
module.exports = deleteNote

