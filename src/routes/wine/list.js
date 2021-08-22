const { prisma } = require("../../prisma")

async function list(req, res) {
  try {
    const wines = await prisma.publicWine.findMany()
    res.status(200).send(wines)
  } catch {
    res.status(400).send("Une erreur est survenue")
  }
}

module.exports = list
