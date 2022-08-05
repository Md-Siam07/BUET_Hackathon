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
const token = "BQAm-HxQgfl2KEg1brBLoAh7KsOCZ8J9b7Skyd3fNv_TORdFSH1MrkIhtmyrRvkaY7sSzDECAXlQ_aTlWlpNmYp9Xuvv5hbR6AreaTr-3ZjRbtygsag4ZT3JTvEkRYpWKVadiTLiHwGahBhgVG2o2mVK-DGLV7sy9ZcRkWEcBapC1jQ-fdkgRcsQlMhEY0J0KbZ9NtTQQyk2BSkQXndDUBJR8yB1BXkithme6_pnkhiOGif3AgAfGroXDXZMa97frmvEUkG9vcPH_c_Xqu9Utu-zcn5i0BQPfWjMJPYsxFDt-8dL6FVGJaAD_w3dZeGgXh6LwaEMKdlmookp"

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
    console.log("tracks", tracks.body.tracks.items[0].album.images)
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


//searchTracks()
//searchTracksByArtist()


app.use('/', router)
app.listen(8000, () => {
    console.log('runnig')
})