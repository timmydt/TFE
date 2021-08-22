const { prisma } = require("../../prisma")

async function list(req, res) {
  try {
    const wines = await prisma.publicWine.findMany({
      where: {
        name: {
          contains: req.body.name
        }
      }
    })
    res.status(200).send(wines)
  } catch(err) {
    console.log(err)
    res.status(400).send("Une erreur est survenue")
  }
}

module.exports = list
