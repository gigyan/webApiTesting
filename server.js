var express = require('express');
var app = express();

var SpotifyWebApi = require('spotify-web-api-node');

//App credentials
var spotifyApi = new SpotifyWebApi({
  clientId : '9705e2cc158043b19015ce7b233efb17' ,
  clientSecret : 'c1317994b8cd42779f82470d11f5557f'
});

// Authenticate our app with Spotify
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err.message);
  });


app.use(express.static('public'));


app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/search", function (request, response) {
  
  let query = request.query.query;
  let artistURI= '';
  
   //Search for artists using the query parameter on the request
   spotifyApi.searchArtists(query)
   .then(function(data) {
   console.log('searchArtists',data)
     artistURI = data.body.artists.items[0].id; 
   }).then(function(result){  
    
    spotifyApi.getArtistTopTracks(artistURI, 'US').then(
      function (data) {
          response.send(data);

      },
      function (err) {
          console.error(err);
      }
  );
 
  
  });  
   
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


