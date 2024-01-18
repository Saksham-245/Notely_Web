const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { User, Token } = require("../models/index");
const { generateToken, invalidateToken } = require("../utils/utils");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

const login = async (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    async (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info.message });
      }

      // Here you would invalidate the previous token. The implementation depends on your setup.
      // For example, you could store the current valid token in the database and check against it.
      // When generating a new token, you would overwrite the old one.

      // Generate a new token
      const token = generateToken(user);

      // Send the new token back to the user
      // Store the token in the token database with the user id
      // Check if a token for this user already exists
      const existingToken = await Token.findOne({ where: { userId: user.id } });
      if (existingToken) {
        // If a token exists, delete it before creating a new one
        await Token.destroy({ where: { userId: user.id } });
      }
      // Create a new token entry in the database
      await Token.create({
        userId: user.id,
        token: token,
      });
      res.cookie(
        "user",
        JSON.stringify({
          name: user.name,
          token: token,
        })
      );
    }
  )(req, res, next);
};

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      message: "Missing credentials",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  if (!(name || email || password)) {
    return res.json({
      message: "No credentials provided",
    });
  }

  await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return res.json({
    message: "Account Created",
  });
};

function logout(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1]; // Assuming 'Bearer <token>' format

  // Invalidate the token
  invalidateToken(token, (error) => {
    if (error) {
      console.error("Error invalidating token:", error); // Debug: Log the error
      return res.status(500).json({ message: "Error logging out" });
    }
    res.status(200).json({ message: "Successfully logged out" });
    res.clearCookie('user');
  });
}

module.exports = {
  login,
  signUp,
  logout,
};
