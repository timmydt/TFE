const {Storage} = require('@google-cloud/storage')
const {ImageAnnotatorClient} = require("@google-cloud/vision")
const path = require('path')
const { format } = require('util')

const client = new ImageAnnotatorClient({
  keyFilename: path.join(__dirname, '..', '..', '..', 'cloud-vision-key.json')
})
const storage = new Storage({
  keyFilename: path.join(__dirname, '..', '..', '..', 'cloud-vision-key.json')
})
const bucket = storage.bucket('tfe-timmy')

async function uploadPicture(req, res) {
  // Création et upload de l'image dans le bucket Google Cloud Storage
  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream({
    resumable: false,
  })

  blobStream.on("error", (err) => {
    res.status(500).send({ message: err.message });
  })

  blobStream.on("finish", async (data) => {
    const uri = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`) 
    // Retrouve le text par rapport au buffer de l'image uploadée
    const [result] = await client.textDetection(req.file.buffer)
    const description = result.textAnnotations[0].description

    res.send({
      description,
      uri
    })
  })

  blobStream.end(req.file.buffer)
}

module.exports = uploadPicture