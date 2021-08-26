const { prisma } = require("../../prisma")

async function rate(req, res) {
  const { rating, id } = req.body

  try {
    const wine = await prisma.privateWine.update({
      where: {
        id: Number(id)
      },
      data: {
        rating: Number(rating)
      }
    })

    res.status(200).send(wine)
  } catch(err) {
    console.log(err)
    res.status(400).send("Une erreur est survenue")
  }
}

module.exports = rate
