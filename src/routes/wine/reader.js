const vision = require("@google-cloud/vision")
const fs = require("fs")
const client = new vision.ImageAnnotatorClient()

async function reader(req, res) {
  const fileName =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzoGExw00BKS7dEMD3UQ_vcLGP-zjOIbzljQ&usqp=CAU"
  const [result] = await client.textDetection(fileName)
  const detections = result.textAnnotations
  console.log("Text:")
  detections.forEach((text) => console.log(text))
}

module.exports = reader
