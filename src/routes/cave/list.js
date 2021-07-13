const { prisma } = require("../../prisma")

async function list(req,res){
    const caves = await prisma.cave.findMany({where:{creatorId:req.user.id}})
    res.status(200).send("Toutes les caves de l'utilisateur ont été renvoyées")
  }

  module.exports = list
