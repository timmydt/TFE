const { prisma } = require("../../prisma")

async function list(req, res) {
  try {
    const users = await prisma.user.findMany({
      where: {
        AND: {
          id: {
            not: req.user.id
          },
          username: {
            contains: req.body.search
          }
        }
      },
      select: {
        id: true,
        username: true,
        last_name: true,
        first_name: true
      }
    })
    res.status(200).send(users)
  } catch {
    res.status(400).send("Une erreur est survenue")
  }
}

module.exports = list
