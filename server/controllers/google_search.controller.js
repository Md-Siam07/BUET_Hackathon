const SerpApi = require('google-search-results-nodejs')
const search = new SerpApi.GoogleSearch("171d49d4a868951d4bb77f389d05328d3adf78bc6797d626cc191e8886da8f10")

const GnewsApi = require('gnews-node-api');
const newsApi = new GnewsApi('b8ae72c77912a5dfb64f0cb632f6b185');
const axios = require('axios');

module.exports.search = (req, res, next) => {
    
    search.json({        
        q: req.body.keyword, 
        location: req.body.location,
       }, (result) => {
         console.log(result)
         res.send(result);
       })
}

// module.exports.topnews = (req, res, next) => {
//     search.json({
//         q: "top news", 
//         location: "Dhaka"
//        }, (result) => {
//          console.log(result)
//          res.send(result);
//        })
// }

// const SerpApi = require('google-search-results-nodejs')
// const search = new SerpApi.GoogleSearch("171d49d4a868951d4bb77f389d05328d3adf78bc6797d626cc191e8886da8f10")

// const GnewsApi = require('gnews-node-api');
// const newsApi = new GnewsApi('b8ae72c77912a5dfb64f0cb632f6b185');
// const axios = require('axios');

// module.exports.search = async (req, res, next) => {
//     var query = req.body.keyword;
//     resss = await axios.get(`https://api.avesapi.com/search?apikey=JDNNX73EZJMJ8ZN7QVDAG3D396C4&num=10&type=web&query=${query}&google_domain=google.com.bd`);
//     //console.log(resss.data.result);
//     res.send(resss.data.result);
// }

// module.exports.topnews = async (req, res, next) => {
//     var query = "top news";
//     resss = await axios.get(`https://api.avesapi.com/search?apikey=JDNNX73EZJMJ8ZN7QVDAG3D396C4&num=10&type=web&query=${query}&google_domain=google.co.in`);
//     //console.log(resss.data.result);
//     res.send(resss.data.result);
// }



module.exports.topnews = (req, res, next) => {
  const options = {
    method: 'GET',
    url: 'https://bing-news-search1.p.rapidapi.com/news',
    params: {safeSearch: 'Off', textFormat: 'Raw'},
    headers: {
      'X-BingApis-SDK': 'true',
      'X-RapidAPI-Key': '2e8e7677e2mshd20a96bc96c2775p14c735jsn00457312b37c',
      'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
      'X-Search-Location': req.body.locaton

    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
  
}