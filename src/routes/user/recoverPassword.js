const nodemailer = require("nodemailer")
const { v4: uuidv4 } = require("uuid")
const { prisma } = require("../../prisma")
const dayjs = require("dayjs")
const bcrypt = require("bcrypt")

async function sendMail(token) {
  let testAccount = await nodemailer.createTestAccount()

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  })

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "timmy.detroch@outlook.com", // list of receivers
    subject: "Token", // Subject line
    text: `ton token batard ${token}` // plain text body
  })
}

async function recoverPassword(req, res) {
  const email = req.body.email
  const uuid = uuidv4()
  const user = await prisma.user.findUnique({
    where: {
      mail: email
    }
  })

  if (user) {
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        recoverPasswordToken: uuid,
        recoverPasswordDate: dayjs().add(10, "minutes").toDate()
      }
    })

    await sendMail(uuid)
    res.status(200).send("samarchent")
  } else {
    res.status(400).send("pas d'user")
  }
}

async function resetPassword(req, res) {
  const token = req.body.token
  const password = req.body.password

  const user = await prisma.user.findUnique({
    where: {
      recoverPasswordToken: token
    }
  })

  if (user) {
    const now = dayjs()
    const notExpired = dayjs(user.recoverPasswordDate).isBefore(now)

    if (notExpired) {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)

      await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          password: hash,
          recoverPasswordDate: null,
          recoverPasswordToken: null
        }
      })

      res.status(200).send("Mot de passe updated (sa marchent)")
    } else {
      res.status(400).send("Lien expired (sa marchent pas)")
    }
  } else {
    res.status(400).send("Mauvais token (sa marchent pas)")
  }
}

exports.resetPassword = resetPassword
exports.recoverPassword = recoverPassword
