const { prisma } = require("../../prisma");

async function listWines(req, res) {
  try {
    const caveWines = await prisma.wine.findMany({
      where: {
        id: req.cave.id,
      },
    });
    res.status(200).send(caveWines);
  } catch (error) {
    console.log(error);
    res.status(400).send("Une erreur est survenue");
  }
}

module.exports = listWines;
