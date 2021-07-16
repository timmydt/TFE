const { prisma } = require("../../prisma");

async function deleteNote(req, res) {
  try {
    const deleteNote = await prisma.note.delete({
      where: {
        id: req.body.id,
      },
    });
    res.status(200).send("La note a été supprimée");
  } catch {
    res.status(400).send("Une erreur est survenue");
  }
}

module.exports = deleteNote;
