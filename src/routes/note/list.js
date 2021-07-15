const { prisma } = require("../../prisma")

async function listNotes(req,res){
    const notes = await prisma.note.findMany({where:{creatorId:req.user.id}})
    res.status(200).send(notes)
  }

  module.exports = listNotes