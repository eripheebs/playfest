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

exports.sendUrlToOcr = function(url,callback) {
  requestForm.form.url = url;
  request.post(requestForm,function(err,data) {
    callback(data.body,err);
  });
};

exports.parseLines = function(inputJSON) {
  var arr = JSON.parse(inputJSON)
    .ParsedResults[0].TextOverlay.Lines
    .map(function(entry){
      var wordList = entry.Words.map(function(word){
        return word.WordText;
      });
      var obj = {
        size: entry.MaxHeight,
        words: wordList
      };
      return obj;
    });
  return arr.sort(function(a,b){
    return parseFloat(b.size) - parseFloat(a.size);
  });
};

exports.parseResponse = function(inputJSON) {
  return JSON.parse(inputJSON)
    .ParsedResults[0].ParsedText
    .toLowerCase()
    .replace(/(the)|(and)/g,'')
    .match(/\w+/g);
};

buildStringArray = function(inputArray) {
  return inputArray.map(function(val,ind,arr){
    return arr.slice(0,ind+1).join(' ');
  }).reverse();
};

buildString = function(inputArray) {
  return arr.join(' ');
};

exports.findArtists = function(wordArray,searchLength,nResults,startPoint){
  console.log("inside findArtists");
  var resultArray = [];
  while(true) {
    console.log("inside while");
    var queryArray = buildStringArray(wordArray.slice(startPoint,startPoint+searchLength+1));
    console.log("queryarr is", queryArray);
    queryArray.forEach(function(queryString,ind,arr){
      var res = spotify.searchForArtist(queryString);
      if(res) {
        resultArray.push(res);
      }

    });
    break;
  }
  return Promise.all(resultArray);
};
