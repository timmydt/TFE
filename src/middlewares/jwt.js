const expressjwt = require("express-jwt");
const jwtMiddleware = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
}).unless({
  path: ["/loginUsers", "/getUsers"],
});

module.exports = {
  jwtMiddleware,
};
