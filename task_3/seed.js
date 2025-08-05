const mongoose = require('mongoose')
const axios = require('axios')
const Episode = require('./models/Episode')

const mongoURI = 'mongodb+srv://MANASI:Iwin123@central-perk.l1lohsm.mongodb.net/?retryWrites=true&w=majority&appName=Central-Perk'
mongoose.connect(mongoURI)

async function seedDB() {
    try{
        const showId = 82;
        const response = await axios.get(`https://api.tvmaze.com/shows/${showId}/episodes`);
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