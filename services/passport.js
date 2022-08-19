const passport = require("passport");
const mongoose = require("mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv");

// call in the model schema
const User = mongoose.model("users");

// Load vars
dotenv.config({
	path: "./config/config.env",
});

googleClientID =
	process.env.GOOGLE_CLIENT_ID;
googleClientSecret = process.env.GOOGLE_CLIENT_SECRET_KEY

// initialize a serialize function
passport.serializeUser((user, done)=>{
	console.log(user)
	done(null, user.id);
})

// Initialize the deserailize function
passport.deserializeUser((id, done)=>{
	User.findById(id).then(user=>{
		done(null, user);  
	})
})

// using GoogleStrategy
passport.use(
	new GoogleStrategy(
		{
			clientID: googleClientID,
			clientSecret: googleClientSecret,
			callbackURL:
				"/auth/google/callback",
		},
		(
			accessToken,
			refreshToken,
			profile,
			done
		) => {
			// const user = new User({googleId : profile.id, Name : profile.displayName})
			// user.save();
			User.findOne({
				googleId: profile.id,
			}).then((existingUser) => {
				if (existingUser) {
					// we already have an existing user
					console.log('User already exist')
					done(null, existingUser);
				} else {
					const entries = new User({
						googleId: profile.id,
						Name: profile.displayName,
					});
					entries.save().then(user=>done(null, user)) 
				}

			});
		}
		
	)
);
