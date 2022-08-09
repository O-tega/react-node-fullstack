const express = require('express');
const dotenv = require('dotenv');

// Load vars
dotenv.config({path: './config/config.env'})

const app = express()

app.get('/', (req, res)=>{
    // res.status(200).json({success: true, data: {id: 1}})
    res.send({hi: 'there'})
})

PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running on ${process.env.NODE_ENV} mode on port ${PORT}`))