const { prisma } = require("../../prisma");

async function list(req, res) {
  try {
    const users = await prisma.user.findMany({
      include: {
        caves: true,
      },
    });
    res.status(200).send(users);
  } catch {
    res.status(400).send("Une erreur est survenue");
  }
}

module.exports = list;
