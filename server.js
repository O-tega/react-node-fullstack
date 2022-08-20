const express = require('express');
const dotenv = require('dotenv');


// Import routes
const authRoutes = require('./routes/authRoutes.routes');

// import dotenv config
dotenv.config({path: "./config/config.env"})

// initialize env




// Initialize app
const app = express();




// initialize routes
app.use('/api/v1/user', authRoutes);
// app.get("/api/user", (req, res)=>{
// 	res.send("new file")
// })











PORT = process.env.PORT || 5000

// Initialize server
app.listen(PORT,()=>{
	console.log(`server running successfully in ${process.env.NODE_ENV} mode on port ${PORT}`);
})