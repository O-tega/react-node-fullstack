const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CourseSchema = new Schema ({
    title:{
        type: String,
        required: true
    },
    description:{
        type : String,
        required: true
    },
    weeks:{
        type : Number,
        required: true
    },
    minimumSkill: {
        type : String,
        required: true
    },
    scholarshipsAvailable:{
        type: Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }

})

module.exports = mongoose.model('Course', CourseSchema );