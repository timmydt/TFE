const { prisma } = require("../../prisma")

 async function createWine(req,res){
     console.log(req.body)
    const wine = await prisma.wine.create({
      data: {
        name :  req.body.name,
        caves : {connect: [{id: req.body.cave}]}
      },
    })
    res.status(200).send("les données ont été ajoutées")
  }

module.exports = createWine