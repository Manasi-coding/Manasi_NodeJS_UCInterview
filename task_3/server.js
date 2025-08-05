const express = require('express')
const mongoose = require('mongoose')
const Episode = require('./models/Episode')
const PORT = 3000

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Welcome to the Episodes API!');
})

mongoose.connect('mongodb+srv://MANASI:Iwin123@central-perk.l1lohsm.mongodb.net/?retryWrites=true&w=majority&appName=Central-Perk')
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection failed:", err))

//post (add new eps manually)
//get (get all the eps)
//get (get just one ep by its id)
//Episode is a mongoose model

app.post('/eps', async (req,res) => {
    try{
        const newEp = new Episode(req.body)     //new Episode object
        await newEp.save()                      //saving the new ep in the database
        //await coz it takes time to save
        res.status(201).json(newEp)             //201 - created
    }
    catch (err){
        console.error(err)
    }
})

app.get('/eps', async (req,res) => {
    try{
        const getAllEps = await Episode.find()
        res.json(getAllEps)
    }
    catch (err){
        console.error(err)
    }
})

app.get('/eps/:id', async (req,res) => {
    try{
        const getEp = await Episode.findOne({id: req.params.id})
        if (!getEp)
            return res.status(404).json({ error: "Episode not found" })
        res.json(getEp)
        //The part inside { } is an object
        //not findByID bcuz that is associated with MongoDB's ID
        //params = values captured from the URL path
        //req.params.id = the value passed in the :id part of the route
    }
    catch (err){
        console.error(err)
    }
})

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`)
})

//put (upload a full ep by its id)
//patch (update specific fields of the episode)
//delete (permanently delete an ep)

app.put('/eps/:id', async (req,res) => {
    try{
        const updatedEp = await Episode.findOneAndUpdate({id: req.params.id}, req.body, {new: true})
        //new: true is necessary. otherwise, MongoDB won't update
        if (!updatedEp)
            return res.status(404).json({ error: "Episode not found" })
        res.json(updatedEp)
    }
    catch (err){
        console.error(err)
    }
})

app.patch('/eps/:id', async (req,res) => {
    try{
        const updatedEp = await Episode.findOne({id: req.params.id})
        if (!updatedEp)
            return res.status(404).json({ error: "Episode not found" })
        Object.assign(updatedEp, req.body)
        await updatedEp.save()
        res.json(updatedEp)
    }
    catch (err){
        console.error(err)
    }
})

//use Object.assign() only in PATCH, not in PUT
//PUT -> overwrite the entire object

app.delete('/eps/:id', async (req,res) => {
    try{
        const toDel = await Episode.findOneAndDelete({id: req.params.id})
        if(!toDel)
            return res.status(404).json({ error: "Episode not found" })
        res.json({ message: "Episode deleted successfully", deletedEpisode: toDel })
    }
    catch (err){
        console.error(err)
    }
})