const jwt = require('jsonwebtoken');
const {Token} = require('../models/index');
const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" }); // Adjust expiresIn as needed
};

function invalidateToken(token, callback) {
  Token.destroy({
    where: { token: token },
  })
    .then(() => callback(null))
    .catch((err) => callback(err));
}

module.exports = { generateToken, invalidateToken };
