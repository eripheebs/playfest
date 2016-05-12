playfestApp.controller('pictureCtrl', ['$scope','$cordovaCamera','Upload',function($scope, $cordovaCamera, Upload) {

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

    return $cordovaCamera.getPicture(options).then(function(imageData){
      Upload.upload({
                 url: 'https://agile-refuge-70787.herokuapp.com/poster/upload',
                 method: 'POST',
                 file: imageData,
             })
        .then(function(response) {
          console.log("reply received with", response);
          $scope.arrayVar = response.body;
        }, function(error){
          console.log("error uploading received", error);
        }, function(evt){
          console.log("making progress, ", parseInt(100.0 * evt.loaded / evt.total));
        });
    }, function(err) {
      console.log("Error taking camera picture");
    });

  };

}]);
