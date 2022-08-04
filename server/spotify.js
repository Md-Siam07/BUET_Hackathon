const express = require('express')
const app = express()
const router = express.Router()
var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
    clientId: '3417f00383a24ca5ac5ded241854c06b',
    clientSecret: '8cf2e0610f9f4f4896c9c367c8ec4d37',
    redirectUri: 'http://localhost:9000/callback'
});
const token = "BQB2sNEBDub9YgcyNGxMt4pwEE6a3OqQuRMh1cYrXzYayg2S6nMTeG9ktLykjjT-1Dz_tTh_M_g-8lzAaHgtJEkig_YtBgJICs3NNTyJLkUskDwbnVoXDEEi6UxO3u1PSNzLLV8C7_HUCakJ84Y-Juowp9IX4kj9i3qEQHEoB92_CiLcYs822kjhafX5tKcLtRLvdbGPpqatUa0IAMHwOxPiC-IYtAPvuUg6jenqu8CjndoKdZx9Q8hxX6aATQGie8cOkCpDpmH56R-UJb9G3V4GLJmFg-y9pyAwUDhy_5iw0Hogcf9sUQ9dkfeq-CUDUNX-QBq-vSVmVVNhdY2f";

router.get('/', (req, res, next) => {
    // console.log("Worked")
    // res.send("YES")
    res.redirect(spotifyApi.createAuthorizeURL([
        "ugc-image-upload",
        "user-read-recently-played",
        "user-read-playback-state",
        "user-top-read",
        "app-remote-control",
        "playlist-modify-public",
        "user-modify-playback-state",
        "playlist-modify-private",
        "user-follow-modify",
        "user-read-currently-playing",
        "user-follow-read",
        "user-library-modify",
        "user-read-playback-position",
        "playlist-read-private",
        "user-read-email",
        "user-read-private",
        "user-library-read",
        "playlist-read-collaborative",
        "streaming"
    ]))
})

router.get('/callback', (req, res, next) => {
    console.log('reqquery', req.query)
    const code = req.query.code
    console.log("code", code);
    spotifyApi.authorizationCodeGrant(req.query.code).then((response) => {
        res.send(JSON.stringify(response))
        spotifyApi.setAccessToken(token)
    })
    //res.send(JSON.stringify(req.query))
})

spotifyApi.setAccessToken(token)

const getMe = () => {
    spotifyApi.getMe()
        .then(function (data) {
            console.log('Some information about the authenticated user', data.body);
        }, function (err) {
            console.log('Something went wrong!', err);
        });
}
//getMe()

const getPlayList = async () => {
    const data = await spotifyApi.getUserPlaylists("31xaayn2mdexfbslkcuecg6qeeym")
    for (let index = 0; index < data.body.items.length; index++) {
        console.log('data', data.body.items[index])
    }
}
//getPlayList()
const searchArtist = async () => {
    const artists = await spotifyApi.searchArtists("Anu=pom")
    console.log('artist', artists)
    console.log(`bilgiler`, artists.body.artists.items[0])
}
//searchArtist()

const searchTracks = async () => {
    const tracks = await spotifyApi.searchTracks('track:prem tumi artist:Tahsan')
    console.log("tracks", tracks.body.tracks.items[0].external_urls)
    //console.log("tracks", tracks.body.tracks.items[1].external_urls)
}

searchTracks()

app.use('/', router)
app.listen(9000, () => {
    console.log('runnig')
})