const list = require("./list")
const createUser = require("./create")
const login = require("./login")
const updatePwd = require("./updatePwd")
const { resetPassword, recoverPassword } = require("./recoverPassword")

exports.createUser = createUser
exports.list = list
exports.login = login

exports.updatePwd = updatePwd

// temp
exports.recoverPassword = recoverPassword
exports.resetPassword = resetPassword
