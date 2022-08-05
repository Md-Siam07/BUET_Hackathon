const express = require('express')
const app = express()
const router = express.Router()
var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
    clientId: '8d0ef2120b5248b192ec07646b2db209',
    clientSecret: '61b8bc30a74041508942ea03d1c8c354',
    redirectUri: 'http://localhost:8000/callback'
});
const token = "BQBn4VOueqSefZ9Dw0eM5XvDJyYFjGMq0r9hrM-8yI0rfAqHlYhq4AZ-a9sHToS8GHbMWulsGEKV450mIxqdZ7yuQtEoxorYsrJe9nAbk27fAnjwS_bMf-AwfXTPkMCpWwdO14Eq_DC5lp5w8nULF_1rVZbjZJI4qOharhk4mtGuGRbwMzzVn7OoVH4IiMjkWIko2UnXhE_-b8dIq65Ks9T9t6M_m-Ab8bOYQH6hJT4bgHmISzW6zQi-inuVumgRWsjsXPpSVkKEVQsyMYQPaQ2tq3Wm_R5q8t_weZkh77PG5G3vfYMzuM8gzOAIZgLEDfGrVbZgoDHAH0tM";

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

module.exports.searchTracks = async (req, res) => {
    console.log(req.params.parameter)
    const tracks = await spotifyApi.searchTracks(`${req.params.parameter}`)
    console.log("tracks", tracks.body.tracks.items);
    res.send(tracks.body.tracks.items);
    //console.log("tracks", tracks.body.tracks.items[1].external_urls)
}

const searchTracksByTrack = async () => {
    const tracks = await spotifyApi.searchTracks('track:prem tumi')
    console.log("tracks", tracks.body.tracks.items[0].external_urls)
    //console.log("tracks", tracks.body.tracks.items[1].external_urls)
}

const searchTracksByArtist = async () => {
    const tracks = await spotifyApi.searchTracks('artist:Tahsan')
    console.log("tracks", tracks.body.tracks.items[0].external_urls)
    console.log("tracks", tracks.body.tracks.items[2].external_urls)

    console.log("size", tracks.body.tracks.items.length)
}

const palyMusic = async () => {
    const tracks = await spotifyApi.searchTracks('artist:Tahsan')
    console.log("tracks", tracks.body.tracks.items[0].external_urls)
    console.log("tracks", tracks.body.tracks.items[2].external_urls)

    console.log("size", tracks.body.tracks.items.length)
}



//searchTracksByArtist()


app.use('/', router)
app.listen(8000, () => {
    console.log('runnig')
})