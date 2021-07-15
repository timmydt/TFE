const { prisma } = require("../../prisma")

 async function createCave(req,res){
    const cave = await prisma.cave.create({
      data: {
        name :  req.body.name,
        creatorId : req.user.id
      }
    })
    res.status(200).send("la cave a correctement été créée")
  }
module.exports = createCave
