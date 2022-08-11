const passport = require("passport");
const GoogleStrategy =
	require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv");

// Load vars
dotenv.config({path: "./config/config.env"});

googleClientID = process.env.clientID;
googleClientSecret =
	"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";

// using GoogleStrategy
passport.use(
	new GoogleStrategy(
		{
			clientID: googleClientID,
			clientSecret: googleClientSecret,
			callbackURL:
				"/auth/google/callback",
		},
		(accessToken) => {
			console.log(accessToken);
		}
	)
);
