var SpotifyWebApi = require('spotify-web-api-node');

exports.newPlaylist = function(username, festivalName, arrayofArtists){
  var playlistID = ''
  var trackIDsArray = [];
  createPlaylist(username, festivalName+' playlist')
    .then(function(response){
      playlistID = response.body.playlistID
      //we dont know the response
    })
    .then(function(){
      arrayofArtists.forEach(function(artist){
        searchForTracks(artist)
          .then(function(response){
              trackIDsArray.push(response.body.trackID);
              // we dont yet know what the response looks like
          });
      });
    }).then(function(){
      addTracksToPlaylist(username, playlistID, trackIDsArray);
    }
}

exports.saveAccessTokenForPlaylist = function(accessToken){
  var spotifyApi = new SpotifyWebApi({
    accessToken : accessToken
  });
}

exports.searchForTracks = function (artistName){
  spotifyApi.searchTracks('artist:'+artistName)
    .then(function(data){
      console.log('Search tracks by '+artistName+' in the artist name', data.body);
    }, function(err) {
      console.error(err);
    });
}

exports.createPlaylist = function (username, playlistTitle){
  return spotifyApi.createPlaylist(username, playlistTitle, {'public' : false})
  .then(function(data){
    console.log('Your playlist' +playlistTitle+ 'was created!');
  }, function(err){
    console.log('Soemthing went wrong!', err);
  });
}

exports.addTracksToPlaylist = function(username, playlistID, trackIDsArray){
  spotifyApi.addTracksToPlaylist(username, playlistID, trackIDsArray)
    .then(function(data){
      console.log('Added tracks to playlist!');
    }, function(err){
      console.log('Something went wrong', err);
    });
}
