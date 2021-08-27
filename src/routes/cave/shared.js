const { prisma } = require("../../prisma")

async function shared(req, res) {
  try {
    const { id } = req.user

    const caves = await prisma.user.findUnique({
      where: {
        id
      },
      select: {
        importedCave: {
          include: {
            bottles: true,
            creator: {
              select: {
                username: true
              }
            }
          }
        }
      }
    })

    res.status(200).send(caves.importedCave)
  } catch (error) {
    console.log(error)
    res.status(400).send("Une erreur est survenue")
  }
}

module.exports = shared
