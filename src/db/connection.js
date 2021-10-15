const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/galleryapp').then(()=>{
    console.log("connection established successfully")
}).catch(()=>{
    console.log("connection failed")
})