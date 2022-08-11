//  import dependencies
const express = require("express");
const dotenv = require("dotenv");


// Require the passport service
require("./services/passport");

// Load vars
dotenv.config({	path: "../config/config.env"});


// Import auth route
const authRoutes = require("./routes/authRoutes.routes");




const app = express();

app.use('/auth/google', authRoutes)



PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(
		`server running on ${process.env.NODE_ENV} mode on port ${PORT}`
	)
);