const { prisma } = require("../../prisma")

 async function updateCave(req,res){

    const cave = await prisma.cave.update({

      where: {
          id: req.body.id
        },
      data: {
          name :  req.body.name
      }
    })

    res.status(200).send("la cave a été mise à jour")
  }
module.exports = updateCave
