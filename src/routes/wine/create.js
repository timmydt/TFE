const { prisma } = require("../../prisma")

 async function createWine(req,res){
     console.log(req.body)
    const wine = await prisma.wine.create({
      data: {
        name :  req.body.name,
        best_before : req.body.best_before,
        food : req.body.food,
        grapes : req.body.grapes,
        isPublic : false,
        maker : req.body.maker,
        picture : req.body.picture,
        year : req.body.year,
        caves : {connect: [{id: req.body.cave}]}
      }
    })
    res.status(200).send("les données ont été ajoutées")
  }

module.exports = createWine