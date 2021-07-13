const { prisma } = require("../../prisma")

async function list(req, res) {
    const users = await prisma.user.findMany({
        include: {
            caves:true
        }
    })
    
    res.status(200).send(users)
}

module.exports = list