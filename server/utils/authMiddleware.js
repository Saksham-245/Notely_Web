const passport = require("passport");
const { JsonWebTokenError } = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  passport.authenticate("bearer", { session: false }, (err, user, info) => {
    if (err || info instanceof JsonWebTokenError) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = authenticateToken;
