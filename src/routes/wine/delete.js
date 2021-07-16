const { prisma } = require("../../prisma");

async function deleteWine(req, res) {
  try {
    await prisma.wine.delete({
      where: {
        isPublic: false,
        id: req.body.id,
      },
    });

    res.status(200).send("deleted wine");
  } catch (error) {
    console.log(error);

    res.status(400).send("erreur");
  }
}

module.exports = deleteWine;
