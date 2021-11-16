var SpotifyWebApi = require('spotify-web-api-node');
var token;

// credentials are optional
var spotifyApi = new SpotifyWebApi({
    clientId: '4c6ad1d4aec64c6788d2a80f1c3bfb77',
    clientSecret: 'b2cecac97b384ea9aa9b00cda8e90037',
    //redirectUri: 'http://www.example.com/callback'
});

return spotifyApi.clientCredentialsGrant().then(
    function (result) {

        spotifyApi.setAccessToken(result.body['access_token']);

        console.log('The access token expires in ' + result.body['expires_in']);
        console.log('The access token is ' + result.body['access_token']);

        var userInput = 'slice the cake';
        var artistURI;

        spotifyApi.searchArtists(userInput).then(function (data) {
            console.log(data.body);
            artistURI = data.body.artists.items[0].id;
            console.log(artistURI);

        }, function (err) {
            console.error(err);
        }).then(function (value) {//#######

            spotifyApi.getArtistAlbums(artistURI, 'US').then(
                function (data) {
                    console.log('Artist albums', data.body);

                },
                function (err) {
                    console.error(err);
                }
            );
        }).catch(function (err) {
            console.log('somethings fucked man');
            console.log('Hint: ');
            console.log(err);
        });
    });