const router = require("express").Router();
const passport = require("passport");

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
// Implement logout
router.get('/api/logout', (req, res)=>{
	req.logout()
	res.send(req.user)
	console.log(req.user)
})

router.get('/api/current_user', (req, res)=>{
	res.send({message:"get new response",
	body: req.user})
	console.log(req.user)
})

module.exports = router;
