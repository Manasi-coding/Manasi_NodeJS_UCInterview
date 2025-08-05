const mongoose = require('mongoose')
const axios = require('axios')
const Episode = require('./models/Episode')

const mongoURI = 'mongodb+srv://manasi:Iwin123@cluster0.gbbk95b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(mongoURI)

async function seedDB() {
    try{
        const response = await axios.get('https://api.tvmaze.com/shows/%7BFetched_id%7D/episodes')
        const eps = response.data.map (episode => ({
        id: episode.id,
        name: episode.name,
        season: episode.season,
        number: episode.number,
        airdate: episode.airdate,
        summary: episode.summary
        }))
        await Episode.deleteMany({})
        await Episode.insertMany(eps)
        console.log('DATA UPLOADED')
        mongoose.connection.close
    }
    catch (err){
        console.error(err)
    }
}

seedDB()