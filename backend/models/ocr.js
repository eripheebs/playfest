var request = require('request');
var spotify = require('../models/spotifyPlaylist.js');

var ocrUrl = 'https://api.ocr.space/parse/image';
var ocrKey = process.env.OCR_KEY;

exports.parseImage = function(url) {
  return _parseImageFiletoWords(url)
    .then(_searchFirstTenArtistsNames);
};

_searchFirstTenArtistsNames = function(data) {
  return _searchForArtists(data.slice(1,10))
    .then(function(list) {
      return list.map(function(val) {
        return val.name;
      });
    });
};

_searchForArtists = function(data) {
  return Promise.all(data.map(function(val){
    return _searchAPIForArtist(val.words.slice(0,3));
  }));
};

_searchAPIForArtist = function(array){
  if(array.length < 1){
      return null;
    }
  return spotify.searchForArtist(array.join(" "))
    .then(function(result){
      if(result.length){
        return result[0];
      }else{
        return _searchAPIForArtist(array.slice(0, -1));
      }
    });
};

_parseImageFiletoWords = function(file) {
  return _sendFileToOcr(file)
    .then(_parseLines);
};

_sendFileToOcr = function(file) {
  return new Promise(function(resolve,reject) {
    _sendToOcrCallback(file,resolve);
  });
};

_sendToOcrCallback = function(file,callback) {
  var form = request.post(ocrUrl,function(err,data){
    callback(data.body);
  }).form();
  _buildRequest(file,form);
};

_buildRequest = function(file, form) {
  form.append('file', file.buffer, {
    filename: file.originalname,
    contentType: file.mimetype
  });
  form.append('apikey', ocrKey);
  form.append('isOverlayRequired', 'true');
};

_parseLines = function(inputJSON) {
  return JSON.parse(inputJSON)
    .ParsedResults[0].TextOverlay.Lines
    .map(function(entry){
      var wordList = entry.Words.map(function(word) {
        return word.WordText;
      });
      return { size: entry.MaxHeight, words: _filterArray(wordList) };
    })
    .filter(function(entry) {
      return entry.words.length > 0;
    })
    .sort(function(a,b){
      return parseFloat(b.size) - parseFloat(a.size);
    });
};

_filterArray = function(inputArray) {
  return inputArray
    .map(function(entry) {
      return entry.toLowerCase();
      })
    .filter(function(entry){
      return entry.length > 2 &&
        entry != 'the' &&
        entry != 'and'&&
        entry.replace(/\W/g,'') === entry;
    });
};
