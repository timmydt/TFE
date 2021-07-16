const { prisma } = require("../../prisma")



  try{
 async function createWine(req,res){
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
      }
    })
    res.status(200).send("La bouteille a été créée")
  }
  }
  catch {
    res.status(400).send('Une erreur est survenue')
  }
  

module.exports = createWine