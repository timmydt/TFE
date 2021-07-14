const { prisma } = require("../../prisma")

 async function createNote(req,res){
    const note = await prisma.note.create({
      data: {
        name : req.body.name,
        note :  req.body.note,
        picture : req.body.picture,
        date : req.body.date,
        creatorId : req.body.creatorId,
      }
    })
  }
module.exports = createNote
