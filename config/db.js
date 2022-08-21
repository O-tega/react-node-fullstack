const mongoose = require('mongoose');


const connectDB = async ()=>{
    try{
        const conn=await
        mongoose.connect(process.env.MONGO_URI_LOCAL, {
            // useNewUrlParser: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        });
        console.log(`Database is connected successfully at: ${conn.connection.host}`)
    }catch(err){
        console.log('Error: ', err);
        process.exit(1)
    }
         
}

module.exports = connectDB;