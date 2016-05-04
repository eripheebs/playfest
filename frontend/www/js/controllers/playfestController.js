playfestApp.controller('playfestController', function(){
  var self = this;

  self.festivalName = '';

  self.changeFestivalName = function(newName){
    self.festivalName = newName;
  };

})
