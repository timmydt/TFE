const { prisma } = require("../../prisma");

async function createCave(req, res) {
  try {
    const cave = await prisma.cave.create({
      data: {
        name: req.body.name,
        creatorId: req.user.id,
      },
    });
    res.status(200).send("la cave a correctement été créée");
  } catch (error) {
    console.log(error);
    res.status(400).send("Une erreur est survenue");
  }
}

module.exports = createCave;
