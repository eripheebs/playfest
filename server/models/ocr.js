var request = require('request');
var ocrKey = process.env.OCR_KEY;
var spotify = require('../models/spotifyPlaylist.js');

var requestForm = {
  url: 'https://api.ocr.space/parse/image',
  form: {
    apikey: ocrKey,
    isOverlayRequired: true
  }
};

exports.searchSpotifyForArtist = function(query) {
  return spotify.searchForArtist(query);
};

exports.parseImage = function(url) {
  return sendUrlToOcr(url)
    .then(parseLines);
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
