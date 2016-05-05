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

exports.getListOfTrackIDs = function(arrayOfArtists){

}

exports.newPlaylist = function(username, accessTok, festivalName, trackIDsArray){
  changeAccessToken(accessTok);
  var playlistID = '';
  createPlaylist(username, festivalName+' playlist')
    .then(function(playlistID){
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
        var songsArray = response.body.tracks.items;
        songsArray.forEach(function(song){
          console.log(song);
          trackIDsArray.push(song.id);
        })
      })
  })
}

searchForTracks = function (artistName){
  return spotifyApi.searchTracks('artist:'+artistName)
    .then(function(data){
      console.log('Search tracks by '+artistName+' in the artist name', data.body);
    }, function(err) {
      console.error('Something went wrong when searching tracks', err);
    });
}

createPlaylist = function (username, playlistTitle){
  return spotifyApi.createPlaylist(username, playlistTitle, {'public' : false})
  .then(function(data){
    console.log('Your playlist' +playlistTitle+ 'was created!');
    return playlistId = data.body.id;
  }, function(err){
    console.log('Something went wrong when creating playlist!', err);
  });
}

addTracksToPlaylist = function(username, playlistID, trackIDsArray){
  spotifyApi.addTracksToPlaylist(username, playlistID, trackIDsArray)
    .then(function(data){
      console.log('Added tracks to playlist!');
    }, function(err){
      console.log('Something went wrong when adding tracks', err);
    });
}
