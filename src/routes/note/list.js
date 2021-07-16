const { prisma } = require("../../prisma")


  try{
async function listNotes(req,res){
    const notes = await prisma.note.findMany({where:{creatorId:req.user.id}})
    res.status(200).send(notes)
  }

  }
  catch {
    res.status(400).send('Une erreur est survenue')
  }
  
  module.exports = listNotes