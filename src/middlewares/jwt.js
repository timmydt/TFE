const expressjwt = require("express-jwt");
const jwtMiddleware = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
}).unless({
  path: ["/users/login", "/users"],
});

module.exports = {
  jwtMiddleware,
};
