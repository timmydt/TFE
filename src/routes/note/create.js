const { prisma } = require("../../prisma")

 async function createNote(req,res){
    const note = await prisma.note.create({
      data: {
        name : req.body.name,
        note :  req.body.note,
        picture : req.body.picture,
        date : req.body.date,
        creatorId : req.user.id
      }
    })
    res.status(200).send("la note a été créée")
  }
module.exports = createNote
