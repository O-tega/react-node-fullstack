//  import dependencies
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// initialize app
const app = express();

// Load vars
dotenv.config({
	path: "../config/config.env",
});

// Require the passport service
require("./services/passport");

// require userSchema
require("./models/User");

// Import auth route
const authRoutes = require("./routes/authRoutes.routes");

// Initialize Database
connectDB();

// Call routes middlewares
app.use("/auth/google", authRoutes);

// Setup server;
PORT = process.env.PORT || 5000;
const server = app.listen(
	PORT,
	console.log(
		`server running on ${process.env.NODE_ENV} mode on port ${PORT}`
	)
);

// handle unhandled promise rejection
process.on('unhandled rejection', (err, promise)=>{
	console.log(`Error: ${err.message}`);
	// Close Server & Exit process
	server.close(()=>process.exit(1)) 
})