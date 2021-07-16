const { prisma } = require("../../prisma")

try{
async function listWines(req,res){
    const caveWines = await prisma.wine.findMany({
      where:{
        id: req.cave.id
      }
    })
    res.status(200).send(caveWines)
  }

  
}
catch {
    res.status(400).send('Une erreur est survenue')
}

  module.exports = listWines
