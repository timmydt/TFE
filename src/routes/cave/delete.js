const { prisma } = require("../../prisma")

async function deleteCave(req,res){
    try {
        await prisma.cave.delete({
            where: {
                id: req.body.id
            }
        })
    
        res.status(200).send("deleted cave")
    } catch (error) {
        console.log(error)

        res.status(400).send('erreur')
    }
}
module.exports = deleteCave

