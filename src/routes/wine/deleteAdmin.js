const { prisma } = require("../../prisma");

async function deleteWineAdmin(req, res) {
  if (req.user.admin == true) {
    try {
      await prisma.wine.delete({
        where: {
          id: req.body.id,
        },
      });

      res.status(200).send("deleted wine");
    } catch (error) {
      console.log(error);

      res.status(400).send("erreur");
    }
  } else {
    res.status(403).send("Accès refusé, vous n'êtes pas administrateur");
  }
}

module.exports = deleteWineAdmin;
