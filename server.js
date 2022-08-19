//  import dependencies
const express = require("express");
const dotenv = require("dotenv");
const cookieSession = require('cookie-session');
const passport = require('passport');
const connectDB = require("./config/db");
// initialize app
const app = express();




// Load vars
dotenv.config({path: "../config/config.env",});
cookieKeys = process.env.cookieKeys

// create cookies
app.use(
	cookieSession({
		maxAge: 24*60*60*1000,
		keys: [cookieKeys]
	})
);  

app.use(passport.initialize());
app.use(passport.session());





// require userSchema
require("./models/User");
// Require the passport service
require("./services/passport");
// Import auth route
const otherRoutes = require("./routes/otherRoutes.routes")
const authRoutes = require("./routes/authRoutes.routes");






// Call routes middlewares
app.use("/auth/google", authRoutes);
app.use("/api", otherRoutes);







   
// Initialize Database
connectDB();

// Setup server;
PORT = process.env.PORT || 5000;
const server = app.listen(
	PORT,
	console.log(
		`server running on ${process.env.NODE_ENV} mode on port ${PORT}`
	)
);

// handle unhandled promise rejection
// process.on('unhandled rejection', (err, promise)=>{
// 	console.log(`Error: ${err.message}`);
// 	// Close Server & Exit process
// 	server.close(()=>process.exit(1))  
// })