const mongoose = require('mongoose')
// const validator = require('validator')


const activitySchema = new mongoose.Schema({
    action : String,
    user : String, 
    image_name : String
})


const Activity = new mongoose.model('Activity', activitySchema)

module.exports = Activity