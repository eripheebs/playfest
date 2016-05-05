var SpotifyWebApi = require('spotify-web-api-node');

exports.newPlaylist = function(username, festivalName, arrayofArtists){

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
