var SpotifyWebApi = require('spotify-web-api-node');

var scopes = ['playlist-read-private', 'playlist-modify-public', 'playlist-modify-private'],
  clientId = "873379a32a354918b0a54f4f79736716",
  clientSecret = process.env.CLIENT_SECRET,
  state = 'jazz-and-eri-women-powahhh';

var spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

exports.newPlaylist = function(username, accessTok, festivalName, arrayOfArtists){
  changeAccessToken(accessTok);
  var playlistID = '';
  createPlaylist(username, festivalName+' playlist')
    .then(function(response){
      playlistID = response.body.playlistID
    })
    .then(getTrackIDArray(arrayOfArtists))
    .then(function(trackIDsArray){
      addTracksToPlaylist(username, playlistID, trackIDsArray)
    })
}

changeAccessToken = function(accessTok){
  spotifyApi.setAccessToken(accessTok);
}

getTrackIDArray = function(arrayOfArtists){
  trackIDsArray = [];
  arrayOfArtists.forEach(function(artist){
    searchForTracks(artist)
      .then(function(response){
        console.log(response);
        trackIDsArray.push(response.body.trackID);
      });
  });
  return trackIDsArray;
}

searchForTracks = function (artistName){
  return spotifyApi.searchTracks('artist:'+artistName)
    .then(function(data){
      console.log('Search tracks by '+artistName+' in the artist name', data.body);
    }, function(err) {
      console.error(err);
    });
}

createPlaylist = function (username, playlistTitle){
  return spotifyApi.createPlaylist(username, playlistTitle, {'public' : false})
  .then(function(data){
    console.log('Your playlist' +playlistTitle+ 'was created!');
  }, function(err){
    console.log('Soemthing went wrong!', err);
  });
}

addTracksToPlaylist = function(username, playlistID, trackIDsArray){
  spotifyApi.addTracksToPlaylist(username, playlistID, trackIDsArray)
    .then(function(data){
      console.log('Added tracks to playlist!');
    }, function(err){
      console.log('Something went wrong', err);
    });
}
