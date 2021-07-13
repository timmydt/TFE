const bcrypt = require('bcrypt')
const { prisma } = require('../../prisma')

async function createUser(req,res){
    const password = req.body.password //je récupère le mot de passe entré par l'utilisateur
    const salt=await bcrypt.genSalt(10) //il génère le nombre de fois qu'il sera salé
    const hash=await bcrypt.hash(password, salt) //je le sale
    const user = await prisma.user.create({
      data: {
        username :  req.body.username,
        password :  hash, //je poste le hash 
        mail : req.body.mail,
        first_name : req.body.first_name,
        last_name : req.body.last_name,
      },
    })
    res.status(200).send()
}

module.exports=createUser