const { login, signUp, logout } = require("../controllers/UserController");
const {
  showAllNotes,
  createNote,
  detailNote,
  deleteNote,
} = require("../controllers/NotesController");
const authenticateToken = require("../utils/authMiddleware");
const {
  googleAuth,
  googleAuthCallback,
} = require("../controllers/GoogleController");
const passport = require("passport");
const { generateToken } = require("../utils/utils");
const { Token } = require("../models/index");

const router = require("express").Router();

router.post("/login", login);

router.post("/signup", signUp);

router.get("/logout", authenticateToken, logout);

router.get("/notes", authenticateToken, showAllNotes);
router.post("/notes", authenticateToken, createNote);
router.get("/note", authenticateToken, detailNote);
router.delete("/note", authenticateToken, deleteNote);

router.get("/auth/google", googleAuth);
router.get("/auth/google/callback", (req, res, next) => {
  passport.authenticate("google", (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login");
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      const token = generateToken(user);
      const existingToken = Token.findOne({ where: { userId: user.id } });
      if (existingToken) {
        // If a token exists, delete it before creating a new one
        Token.destroy({ where: { userId: user.id } });
      }
      Token.create({
        userId: user.id,
        token: token,
      });
      res.cookie(
        "user",
        JSON.stringify({
          name: req.user.name,
          token: token,
        })
      );
      return res.redirect("http://localhost:5173");
    });
  })(req, res, next);
});

module.exports = router;
