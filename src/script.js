const express = require('express')
const Image =  require ('../src/models/image')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/galleryapp',()=>{
    console.log("Datebase Connected, going to run script")
})
app = express()
const json_arr = [
{
    "name": "sample image 5",
        "author" : "Michael",
        "like_count" : 10,
        "dislike_count" : 1
},
{
    "name": "sample image 6",
        "author" : "Lodha",
        "like_count" : 10,
        "dislike_count" : 1
},
]
const json_obj = {
    "name": "sample image 4",
        "author" : "Peter",
        "like_count" : 10,
        "dislike_count" : 1
}




const insertImages = async ()=>{
   let data = await Image.insertMany(json_arr)
    console.log(data)
}

const insertImage = async ()=>{
    try{
        let data = new Image(json_obj)
        let res = await data.save()
        console.log(res)
    }
    catch(e){
        console.log(e)
    }
   
}

module.exports = {insertImages,insertImage}
// insertImages()
// insertImage()