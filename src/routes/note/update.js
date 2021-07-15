const { prisma } = require("@prisma/client")

 async function updateNote(req,res){

    const cave = await prisma.cave.update({

      where: {
          id: req.body.id
        },

      data: {
        name : req.body.name,
        note :  req.body.note,
        picture : req.body.picture,
        date : req.body.date,
      }
    })

    res.status(200).send("la note a été mise à jour")
  }
module.exports = updateNote
