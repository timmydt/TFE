const { prisma } = require("../../prisma")

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

module.exports = list
