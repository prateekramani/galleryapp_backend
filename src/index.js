const express =  require('express')
const app = express() 
const port =  process.env.port | 4000 
require('./db/connection')
const Image = require('./models/image')
const Activity = require('./models/activity')
const cors = require('cors')
app.use(express.json())
const corsOptions = {
    origin: "http://localhost:4200"
}
app.use(cors(corsOptions))

app.get('/',(req, res)=>{
    res.send('welcome to my technical website')
})

// app.get('/about' , (req, res)=>{
//     res.send('welcome to my about website')
// })

app.get('/image', async(req, res)=>{
           try{
               const img = await Image.find()
            //    console.log(img)
               res.send(img)
           }
           catch (e){
                res.send(e)
           }
    })
    
app.post('/image', async(req, res)=>{
    const img = new Image({
        "name": "sample image 3",
        "author" : "Will Smith",
        "like_count" : 10,
        "dislike_count" : 1
    })
    try{
        const data =await img.save()
        console.log(data)
        res.send(data)
    }
    catch (e){
        res.send(e)
    }
})


app.get('/activity', async(req, res)=>{
    try{
        const activities = await Activity.find({user: req.query.username})
        console.log(activities)
        res.send(activities)
    }
    catch (e){
         res.send(e)
    }
})


app.post('/activity', async(req, res)=>{
    try{ 
        var data =await Image.updateOne({_id : req.body._id} ,
             { $inc : {"like_count" :req.body.inc_like ,"dislike_count" :req.body.inc_dislike }})
         data = await Activity.find({"image_name" : req.body.name, "user": req.body.user})
        if (data.length>0)
            {
                await Activity.updateOne({"image_name" : req.body.name, "user": req.body.user} , 
                { $set : {"action" : req.body.action}})
                console.log("Date Updated")
            }
        else{
            obj =new Activity({"image_name" : req.body.name, "user": req.body.user,"action" :req.body.action }) 
             data = await obj.save()
             console.log(data)
            console.log("Date Created")
        }
        
        res.status(200)
        res.send({"status" : "Data Modified Successfully"})
    }
    catch (e){
        console.log(e)
        res.status(500)
        res.send(e)
    }
})

app.listen(port , ()=>{
    console.log(`listening on port ${port}`)
})