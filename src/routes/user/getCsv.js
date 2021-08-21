const { prisma } = require("../../prisma")

async function getCsv(req, res) {
  try {
    const converter = require("json-2-csv")

    async function getDataCave() {
      const dataCave = await prisma.cave.findMany({
        where: {
          creatorId: req.user.id
        }
      })
      return dataCave
    }

    async function getDataNote() {
      const dataNote = await prisma.note.findMany({
        where: {
          creator: {
            id: req.user.id
          }
        }
      })
      return dataNote
    }

    async function getDataBottle() {
      const dataBottle = await prisma.privateWine.findMany({
        where: {
          creator: {
            id: req.user.id
          }
        }
      })
      return dataBottle
    }

    //formatage des json
    const DataToCsvCave = function (err, csvCave) {
      if (err) throw err
      console.log(csvCave)
    }
    const DataToCsvNote = function (err, csvNote) {
      if (err) throw err
      console.log(csvNote)
    }
    const DataToCsvBottle = function (err, csvBottle) {
      if (err) throw err
      console.log(csvBottle)
    }

    converter.json2csv(await getDataCave(), DataToCsvCave)
    converter.json2csv(await getDataNote(), DataToCsvNote)
    converter.json2csv(await getDataBottle(), DataToCsvBottle)

    res.status(200).send("CSV Created")
  } catch (error) {
    res.status(400).send(error)
  }
}

module.exports = getCsv
