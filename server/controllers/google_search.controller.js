const SerpApi = require('google-search-results-nodejs')
const search = new SerpApi.GoogleSearch("171d49d4a868951d4bb77f389d05328d3adf78bc6797d626cc191e8886da8f10")

const GnewsApi = require('gnews-node-api');
const newsApi = new GnewsApi('b8ae72c77912a5dfb64f0cb632f6b185');
const axios = require('axios');
var geocoder = require('local-reverse-geocoder');

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
//     var query = req.body.location + " top news" ;
//     resss = await axios.get(`https://api.avesapi.com/search?apikey=JDNNX73EZJMJ8ZN7QVDAG3D396C4&num=10&type=web&query=${query}&google_domain=google.co.bd`);
//     //console.log(resss.data.result);
//     res.send(resss.data.result);
// }



module.exports.topnews = async (req, res2, next) => {
  var loc = '';
  var point = { latitude: req.body.latitude, longitude: req.body.longitude };
  await geocoder.lookUp(point, function (err, res) {
    console.log(JSON.stringify(res[0][0].admin1Code.name, null, 2));
    const options = {
      method: 'GET',
      url: 'https://bing-news-search1.p.rapidapi.com/news',
      params: {textFormat: 'Raw', safeSearch: 'Off'},
      headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': '3bd9d21b5fmsh3e875e10d6c3d80p120a75jsnb1d0354c27ed',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
        'X-Search-Location': res[0][0].admin1Code.name
      }
    };
    
    axios.request(options).then(function (response) {
        //console.log(response.data);
        console.log(response.data.value);
        res2.send(response.data.value);
    }).catch(function (error) {
        console.error(error);
    });
  });
    
  
}