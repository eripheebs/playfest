var request = require('request');
var ocrKey = process.env.OCR_KEY;
var spotify = require('../models/spotifyPlaylist.js');

var ocrUrl = 'https://api.ocr.space/parse/image';

exports.parseImage = function(url) {
  return _parseImageFiletoBlob(url)
    .then(function(blob) {
      var firstGroup = blob.slice(0,10);
      return _searchForArtistNames(firstGroup)
        .then(function(list) {
          return list.map(function(val) {
            return val.name;
          });
        });
    });
};

_searchForArtistNames = function(data) {
  return Promise.all(data.map(function(val){
    return searchAPIForArtist(val.words);
  }));
};

_parseImageFiletoBlob = function(file) {
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
      var obj = {
        size: entry.MaxHeight,
        words: filterArray(wordList)
      };
      return obj;
      })
    .filter(function(entry) {
      return entry.words.length > 0;
      })
    .sort(function(a,b){
      return parseFloat(b.size) - parseFloat(a.size);
      });
};

//////////////////////////old//////////////////////////
sendUrlToOcr = function(url) {
  return new Promise(function(resolve,reject) {
    requestForm.form.url = url;
    request.post(requestForm, function(err, data) {
      resolve(data.body);
    });
  });
};



exports.parseImageFile = function(file) {
  console.log('inside parse 1', file);
  return parseImageFiletoBlob(file)
    .then(function(blob) {
      var firstGroup = blob.slice(0,10);
      return searchForAllArtists(firstGroup)
        .then(function(list) {
          return list.map(function(val) {
            return val.name;
          });
        });
    });
};

parseImagetoBlob = function(url) {
  return sendUrlToOcr(url)
    .then(parseLines);
};


searchForAllArtists = function(data){
  return Promise.all(data.map(function(value, index, array){
    return searchAPIForArtist(value.words);
  }));
};

searchAPIForArtist = function(array){
  if(array.length < 1){
      return null;
    }
  var possibleArtistString = buildString(array);
  return searchSpotifyForArtist(possibleArtistString)
    .then(function(result){
      if(result.length){
        return result[0];
      }else{
        return searchAPIForArtist(array.slice(0, -1));
      }
    });
};

buildString = function(array){
  return array.join(" ");
};

buildTestString = function(array){
  return array.map(function(value, index, array){
    return array.slice(0, index+1).join(" ");
  }).reverse();
};

searchSpotifyForArtist = function(query) {
  return spotify.searchForArtist(query);
};



filterDate = function(blob) {
  blob.some(function(val,ind,arr) {
    if(containsDate(val)) {
      var possibleDate = arr.splice(ind,1);
      return true;
    }
  });
};

containsDate = function(sentence) {
  return sentence.words.some(function(value) {
    return DATES.includes(value);
  });
};

sendUrlToOcr = function(url) {
  return new Promise(function(resolve,reject) {
    requestForm.form.url = url;
    request.post(requestForm, function(err, data) {
      resolve(data.body);
    });
  });
};

filterArray = function(inputArray) {
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
