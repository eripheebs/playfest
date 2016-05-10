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

exports.testSearch = function(data){
  return searchForAllArtists(data);
}

searchForAllArtists = function(data){
  return Promise.all(data.map(function(value, index, array){
    return searchAPIForArtist(value.words);
  }));
};

// searchArtists = function(arrayOfWords, original) {
//   console.log("calling searchArtists with", arrayOfWords, original);
//   if(arrayOfWords < 1){
//     return [];
//   }
//   var possibleArtistString = buildString(arrayOfWords);
//   return searchSpotifyForArtist(possibleArtistString)
//     .then(function(result){
//       if(result !== []){
//         console.log("result found!", result);
//         var newOriginalArray = original.slice(arrayOfWords.length);
//         return searchArtists(newOriginalArray, newOriginalArray)
//         .then(function(nextResult){
//           var temp = nextResult.push(result);
//           console.log(temp);
//           return temp;
//         });
//       }else{
//         console.log("no result found");
//         if(arrayOfWords.length === 1){
//           console.log("down to one word", arrayOfWords);
//           var newOriginalArray = original.slice(1);
//           return searchArtists(newOriginalArray, newOriginalArray);
//         }
//         var newSearchArray = arrayOfWords.slice(-1)
//         return searchArtist(newSearchArray, original);
//       };
//     });
// };

searchAPIForArtist = function(array){
  if(array.length < 1){
      return null;
    }
  console.log("testing with", array);
  var possibleArtistString = buildString(array);
  return searchSpotifyForArtist(possibleArtistString)
    .then(function(result){
      if(result.length){
        // console.log("results found", result[0]);
        return result[0];
      }else{
        return searchAPIForArtist(array.slice(0, -1));
      }
    });
};

buildString = function(array){
  return array.join(" ");
}

buildTestString = function(array){
  return array.map(function(value, index, array){
    return array.slice(0, index+1).join(" ");
  }).reverse();
};

searchSpotifyForArtist = function(query) {
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
