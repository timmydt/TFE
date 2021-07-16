const { prisma } = require("../../prisma")

try{
async function list(req,res){
  const caves = await prisma.cave.findMany({
    where:{
      creatorId: req.user.id
    },
    include: {
      bottles: true
    }
  })

  return res.status(200).send(caves)
}

}
catch {
    res.status(400).send('Une erreur est survenue')
}

module.exports = list
