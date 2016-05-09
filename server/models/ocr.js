var request = require('request');
var ocrKey = process.env.OCR_KEY;

var requestForm = {
  url: 'https://api.ocr.space/parse/image',
  form: {
    apikey: ocrKey
  }
};

exports.sendUrlToOcr = function(url,callback){
  requestForm.form.url = url;
  request.post(requestForm,function(err,data){
    callback(data.body,err);
  });
};

exports.parseResponse = function(inputJSON) {
  return JSON.parse(inputJSON)
    .ParsedResults[0].ParsedText
    .match(/\w+/g)
    .map(function(word){return word.toLowerCase();});
};

exports.buildStringArray = function(inputArray) {
  return inputArray.map(function(val,ind,arr){
    return arr.slice(0,ind+1).join(' ');
  }).reverse();
};
