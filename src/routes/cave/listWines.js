const { prisma } = require("../../prisma")

async function listWines(req,res){
    const caveWines = await prisma.wine.findMany({where:{id:req.cave.id}})
    res.status(200).send(caveWines)
  }

  module.exports = listWines
