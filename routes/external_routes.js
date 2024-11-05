const express = require("express");
const externalRouter = express.Router();
const axios = require('axios');
const https = require('https'); // Add this line to require the https module

const urlToNews = 'https://newsapi.org/v2/top-headlines';
const apiKey = '20dc12da8ef34cfb8252bd9b0a8401b4';

externalRouter.get("/getNews/:query", async (req, res) => {
  try {
    const query = req.params.query;
    getNewsFromSource(query)
      .then(data => {
        console.log(data);
        if (data && data.articles) {
          const articles = data.articles;
          const extractedData = articles.map(article => ({
            title: article.title,
            url: article.url
          }));
          return res.status(200).json(extractedData);
        }
        return res.status(404).json({ message: "No News Found" });
      })
      .catch(error => {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
      });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

function getNewsFromSource(topic) {
  const endpoint = `${urlToNews}?sources=${topic}&apiKey=${apiKey}`;

  const axiosConfig = {
    httpsAgent: new https.Agent({ rejectUnauthorized: false })
  };

  return axios.get(endpoint, axiosConfig)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw new Error(error.message);
    });
}


module.exports = externalRouter;