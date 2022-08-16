// Import libraries
// import mongoose, { model } from 'mongoose'; ES6 declaration
const mongoose = require('mongoose')
const {Schema} = mongoose;

const userSchema = new Schema ({
    googleId: String
})

mongoose.model('users', userSchema);

