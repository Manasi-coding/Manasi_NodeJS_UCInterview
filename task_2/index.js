import express from 'express';
import axios from 'axios';

const app = express();
const PORT = 3000;

const title = 'friends';
const showAPI = `https://api.tvmaze.com/singlesearch/shows?q=${title}`;

app.get('/', (req, res) => {
  res.send('Welcome to the Friends API! Try <a href="show-details">/show-details</a> or <a href="episodes">/episodes</a>');
});

app.get('/show-details', async (req, res) => {
  try {
    const response = await axios.get(showAPI);
    const show = response.data;

    res.status(200).json({
      id: show.id,
      name: show.name,
      language: show.language,
      genres: show.genres,
      status: show.status,
      premiered: show.premiered,
      ended: show.ended,
      rating: show.rating?.average,
      summary: show.summary,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch show details.' });
  }
});

app.get('/episodes', async (req, res) => {
  try {
    const showRes = await axios.get(showAPI);
    const showId = showRes.data.id;

    const episodesRes = await axios.get(`https://api.tvmaze.com/shows/${showId}/episodes`);
    const episodes = episodesRes.data.map(ep => ({
      id: ep.id,
      name: ep.name,
      season: ep.season,
      number: ep.number,
      airdate: ep.airdate,
      summary: ep.summary
    }));

    res.status(200).json({ totalEpisodes: episodes.length, episodes });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch episodes.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
