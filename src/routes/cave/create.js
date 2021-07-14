const { prisma } = require("../../prisma")

 async function createCave(req,res){
    const cave = await prisma.cave.create({
      data: {
        name :  req.body.name,
        creatorId : req.body.creatorId
      }
    })
  }
module.exports = createCave
