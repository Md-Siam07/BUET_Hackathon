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
const token = "BQCJD8Bxan5TWZs-YNq3cYEaC4Z2HlLwsi9HAn0hpDK9x1nf3SG23iaFkQEAw_ey8HShOasX7M6OAsPbdzU2LfAGev7z5_ECgj7-VP7fRd0dgtvAi7PmRGmdkHi_W50-QRn_dP7e95bDCJPwxRFrfKBTX59XDh_0Xoc5-V0ZKBXdPILId9EleCahGsTM8AFg3NFIgboO-U1-anJXRTeh9YiVB5CL5W3gqXcr-nQJWUnO1YipPSPVkBpv1lFOIpvgyBtrm9sdx-y1JfThT8xabnx0sE6ICIhut039I51UNREjrhgDNgImAYarT-jhlI5lo5jA8WpbFrAV65x_SHrb"

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
    console.log("tracks", tracks.body.tracks.items[0])
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


searchTracks()
//searchTracksByArtist()


app.use('/', router)
app.listen(9000, () => {
    console.log('runnig')
})