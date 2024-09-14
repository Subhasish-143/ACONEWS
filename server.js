const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const API_KEY = "d4d8858766df8d3ad4f02d676b12c66b";

// Test route
app.get('/', (req, res) => {
  res.send('Gnews API Backend is running');
  
  console.log(`API Key: ${API_KEY}`);
});

// Route to get all news
app.get('/all-news', async (req, res) => {
  const { category = 'general', lang = 'en', max = 10, page=1 } = req.query;

  const url =  `https://gnews.io/api/v4/top-headlines?category=${category}&page=${page}&lang=${lang}&max=${max}&apikey=d4d8858766df8d3ad4f02d676b12c66b`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching news data' });
  }
});

// top-headlines
app.options('/top-headlines',cors());
app.get('/top-headlines', async (req, res) => {
    const category = req.query.category || 'business';
    const lang = req.query.lang || 'en';
    let max = parseInt(req.query.max) || 10;
    let page = parseInt(req.query.page) || 1;
  
    const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=${lang}&page=${page}&max=${max}&apikey=d4d8858766df8d3ad4f02d676b12c66b`;
  
    try {
      const response = await axios.get(url);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching news data' });
    }
  });

// country specific
app.options("/country",cors());
app.get("/country", async (req,res) => {
    const country = req.query.country || "in";
    const max = parseInt(req.query.max) || 10;
    const page = parseInt(req.query.page) || 1;

    const url = `https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=${country}&max=${max}&page=${page}&apikey=d4d8858766df8d3ad4f02d676b12c66b`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching news data' });
      }
})

// search
app.options("/search",cors());
app.get("/search", async (req,res) => {
    const search = req.query.search || `Bitcoin`;
    const max = parseInt(req.query.max) || 10;
    const page = parseInt(req.query.page) || 1;

    const url = "https://gnews.io/api/v4/search?q="+search+"&lang=en&max="+max+"&page="+page+"&apikey=d4d8858766df8d3ad4f02d676b12c66b";

    console.log(url);
    try {
        const response = await axios.get(url);
        res.json(response.data);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching news data' });
      }
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});