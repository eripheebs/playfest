var request = require('request');
var ocrKey = process.env.OCR_KEY;
var spotify = require('../models/spotifyPlaylist.js');

var requestForm = {
  url: 'https://api.ocr.space/parse/image',
  formData: {
    apikey: ocrKey,
    isOverlayRequired: 'true'
  }
};

sendFileToOcr = function(file) {
  console.log('ocr', file);
  return new Promise(function(resolve,reject) {
    console.log('inside sendfile1, form', requestForm);
    requestForm.formData.file = file;
    console.log('inside sendfile2, form', requestForm);
    request.post(requestForm, function(err, data) {
      resolve(data.body);
    });
  });
};

exports.parseImage = function(url) {
  return parseImagetoBlob(url)
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

parseImageFiletoBlob = function(file) {
  console.log('inside parsetoblob',file);
  return sendFileToOcr(file)
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

parseLines = function(inputJSON) {
  console.log('inside parseline', inputJSON);
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
