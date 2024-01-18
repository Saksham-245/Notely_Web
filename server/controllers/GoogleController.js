const passport = require("passport");

// Redirect to Google for authentication
const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

const googleAuthCallback = (req, res) => {
  
};

module.exports = {
  googleAuth,
  googleAuthCallback
};
