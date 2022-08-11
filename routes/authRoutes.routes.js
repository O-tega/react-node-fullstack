const router = require("express").Router();
const passport = require("passport")

// create a route that user will be redirected to after google authentication
router.get(
	"/",
	passport.authenticate("google", {
		scope: ["profile", "email"],
	})
);

// get the details from the redirect page
router.get(
	"/callback",
	passport.authenticate("google")
);

module.exports = router;
