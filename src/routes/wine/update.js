const { Storage } = require("@google-cloud/storage");
const path = require('path');
const { format } = require("util");
const { prisma } = require("../../prisma")

const storage = new Storage({
  keyFilename: path.join(__dirname, '..', '..', '..', 'cloud-vision-key.json')
})
const bucket = storage.bucket('tfe-timmy')

async function update(req, res) {
  if (!req.file) {
    try {
      const wine = await prisma.privateWine.update({
        where: {
          id: Number(req.body.id)
        },
        data: {
          name: req.body.name,
          best_before: req.body.best_before ? new Date(req.body.best_before) : null,
          food: req.body.food,
          grapes: req.body.grapes,
          maker: req.body.maker,
          year: Number(req.body.year),
          quantity: Number(req.body.quantity)
        }
      })
      console.log(wine)
      return res.status(200).send("La bouteille a été créée")
    } catch(err) {
      return res.status(400).send("Une erreur est survenue")
    }
  }
  // Création et upload de l'image dans le bucket Google Cloud Storage
  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream({ resumable: false })

  blobStream.on("error", (err) => {
    return res.status(500).send({ message: err.message });
  })

  blobStream.on("finish", async (data) => {
    const uri = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`) 

    try {
      const wine = await prisma.privateWine.update({
        where: {
          id: Number(req.body.id)
        },
        data: {
          name: req.body.name,
          best_before: req.body.best_before ? new Date(req.body.best_before) : null,
          food: req.body.food,
          grapes: req.body.grapes,
          maker: req.body.maker,
          picture: uri,
          year: Number(req.body.year)
        }
      })
  
      return res.status(200).send("La bouteille a été créée")
    } catch(err) {
      console.log(err)
      return res.status(400).send("Une erreur est survenue")
    }
  })

  blobStream.end(req.file.buffer)
}

module.exports = update
