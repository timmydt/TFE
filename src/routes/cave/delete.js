const { prisma } = require("../../prisma");

async function deleteCave(req, res) {
  try {
    await prisma.cave.delete({
      where: {
        id: req.body.id,
      },
    });
    res.status(200).send("La cave a été supprimée");
  } catch (error) {
    console.log(error);

    res.status(400).send("Une erreur est survenue");
  }
}
module.exports = deleteCave;
