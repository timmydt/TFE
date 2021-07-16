const { prisma } = require("../../prisma");

async function updatePwd(req, res) {
  try {
    const password = req.body.password;
    const oldPassword = req.body.oldPassword;
    const salt = await bcrypt.genSalt(10);
    const oldHash = await bcrypt.hash(oldPassword, salt);

    const exists = await prisma.user.count({
      where: {
        id: req.user.id,
        password: oldHash,
      },
    });

    if (exists > 0) {
      // si l'user existe, je demande le nouveau mdp puisque ça veut dire qu'il ne s'est pas trompé
      const hash = await bcrypt.hash(password, salt);
      const user = await prisma.user.update({
        where: {
          id: req.user.id,
          password: hash,
        },
      });
      res
        .status(200)
        .send("le mot de passe de l'utilisateur a été mise à jour");
    } else {
      res.status(400).send("le mdp rentré est incorrect");
    }
  } catch {
    res.status(400).send("Une erreur est survenue");
  }
}

module.exports = updatePwd;
