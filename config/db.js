const mongoose = require('mongoose');
// const dotenv = require('dotenv')

// dotenv.config({path: "../config/config.env",});


const connectDB = async()=>{
	try{
		const conn = await mongoose.connect(
			process.env.MONGO_URI,
			{
				// useNewUrlParser: true,
				// useCreateIndex : true,
				// useFindAndModify: false,
				useUnifiedTopology: true,
			}
		);
		console.log(`Database connected: ${conn.connection.host}`)
	}catch(err){
		console.log("Error:", err);
		process.exit(1);
	}
}

    
module.exports = connectDB;     