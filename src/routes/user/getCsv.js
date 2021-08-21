const { prisma } = require("../../prisma")
const fs = require("fs")
const converter = require("json-2-csv")
const { Storage } = require("@google-cloud/storage")
const path = require("path")
const { format } = require("url")

const storage = new Storage({
  keyFilename: path.join(__dirname, '..', '..', '..', 'cloud-vision-key.json')
})
const bucket = storage.bucket('tfe-timmy')

function getCaves(creatorId) {
  return prisma.cave.findMany({
    where: {
      creatorId
    }
  })
}

function getNotes(id) {
  return prisma.note.findMany({
    where: {
      creator: {
        id
      }
    }
  })
}

function getBottles(id) {
  return prisma.privateWine.findMany({
    where: {
      creator: {
        id
      }
    }
  })
}

async function generateCSV(err, data, name) {
  return new Promise((resolve, reject) => {
    if (err) {
      throw err
    }
  
    const buffer = Buffer.from(data, 'utf-8')
    const file = bucket.file(name)
    const stream = file.createWriteStream({ resumable: false })
  
    stream.on("error", (err) => {
      reject(err)
    })
  
    stream.on("finish", async (data) => {
      const uri = format(`https://storage.googleapis.com/${bucket.name}/${file.name}`) 
      resolve(uri)
    })
  
    stream.end(buffer)
  })
}

async function getCsv(req, res) {
  try {
    const {id} = req.user
    const [caves, notes, bottles] = await prisma.$transaction([
      getCaves(id),
      getNotes(id),
      getBottles(id)
    ])

    converter.json2csv(caves, async (err, data) => {
      const cavesURI = await generateCSV(err, data, `caves-${id}.csv`)

      converter.json2csv(notes, async (err, data) => {
        const notesURI = await generateCSV(err, data, `notes-${id}.csv`)

        converter.json2csv(bottles, async (err, data) => {
          const bottlesURI = await generateCSV(err, data, `bottles-${id}.csv`)

          res.status(200).send({
            cavesURI,
            notesURI,
            bottlesURI
          })
        })
      })
    })
  } catch (error) {
    res.status(400).send(error)
  }
}

module.exports = getCsv
