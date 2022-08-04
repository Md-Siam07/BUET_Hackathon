const SerpApi = require('google-search-results-nodejs')
const search = new SerpApi.GoogleSearch("171d49d4a868951d4bb77f389d05328d3adf78bc6797d626cc191e8886da8f10")


module.exports.search = (req, res, next) => {
    search.json({
        q: req.body.keyword, 
        location: "Dhaka"
       }, (result) => {
         console.log(result)
         res.send(result);
       })
}