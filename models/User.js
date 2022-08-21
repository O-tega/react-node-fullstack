const mongoose = require('mongoose')
const Schema = mongoose.Schema()

const UserSchema = new Schema({

    name:{
        type: String,
        required: [true, 'name is required'],
        unique: true,
        trim: true,
        maxlength: [50, 'cannot exceed 50 characters']
    },
    slug: String,
    decscription: {
        type: String,
        required: [true, 'description is required'],
        maxlength: [500, 'cannot exceed 500 characters']
    }
})


