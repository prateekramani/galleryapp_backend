const mongoose = require('mongoose')
// const validator = require('validator')


const imgSchema = new mongoose.Schema({
    name : String,
    author : String, 
    like_count : Number,
    dislike_count : Number
})


const Image = new mongoose.model('Image', imgSchema)

module.exports = Image