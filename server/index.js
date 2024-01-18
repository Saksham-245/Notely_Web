const express = require("express");
const cors = require("cors");
const apiRoutes = require("./apiRoutes/routes");
const passport = require("passport");
const { Strategy: BearerStrategy } = require("passport-http-bearer");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
require("dotenv").config(); // Load environment variables at the start
const jwt = require("jsonwebtoken");
const session = require("express-session");
const { User } = require("./models/index");

const app = express();

// Since bodyParser.json() is deprecated in the newer versions of Express, use express.json()
app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: "your-session-secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.get('/api/auth/user', (req, res) => {
  res.send({ user: req.user });
});
app.use("/api", apiRoutes);

passport.use(
  new BearerStrategy((token, done) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return done(err);
      }
      // Optionally, you could look up the user in the database again here
      return done(null, decoded, { scope: "all" });
    });
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {

      if (accessToken) {
        try {
          const existingUser = await User.findOne({
            where: {
              email: profile.emails[0].value,
            },
          });
          if (existingUser) {
            return done(null, existingUser);
          }
          const newUser = await User.create({
            email: profile.emails[0].value,
            name: profile.displayName,
            provider: "google",
          });
          const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
          );
          newUser.token = token;
          await newUser.save();
          return done(null, newUser);
        } catch (error) {
          console.error(error);
          return done(error);
        }
      } else {
        return done(new Error("No access token"));
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});

const PORT = process.env.PORT || 8000; // Use the PORT from environment or fallback to 8000
app.listen(PORT, () => {
  console.log(`Server started running on port ${PORT}`);
});
