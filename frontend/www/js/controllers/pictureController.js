playfestApp.controller('pictureCtrl', function($scope, $cordovaCamera) {

  $scope.takePicture = function() {

          var options = {
              quality : 75,
              destinationType : Camera.DestinationType.DATA_URL,
              sourceType : Camera.PictureSourceType.CAMERA,
              allowEdit : true,
              encodingType: Camera.EncodingType.JPEG,
              targetWidth: 300,
              targetHeight: 300,
              popoverOptions: CameraPopoverOptions,
              saveToPhotoAlbum: false
          };

    return $cordovaCamera.getPicture(options).then(function(imageData) {
      $scope.imgURI = "data:image/jpeg;base64," + imageData;
      return $upload.upload({
               url: 'http://localhost:5000/poster',
               method: 'POST',
               file: imageData,
           }).progress(function(evt) {
               console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
           }).success(function(response, status, headers, config) {
               console.log("Image uploaded!");
               return response.data;
           });
    }, function(err) {
      console.log("It isn't working, mate.")
    });

  }

});
