angular.module('toroTest', ['ngFileUpload'])
.controller('mainController',['Upload','$window','$http','$scope', function(Upload,$window, $http, $scope){
    var vm = $scope;
    vm.submit = function(){ //function to call on form submit
        if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
            vm.upload(vm.file); //call upload function
        }
    }

    vm.upload = function (file, $http) {
      console.log(file)
        // vm.displayContent(file)
        Upload.upload({
            url: 'http://localhost:3000/upload', //webAPI exposed to upload the file
            data:{file:file} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            console.log(resp)
            console.log(resp.config.data.file.name)
            // vm.displayContent(resp.config.data.file)
            var fileName = resp.config.data.file.name;
              getFile(resp.config.data.file.name)
        });
    };
    function getFile(fileName){
      var url = "/uploads/" + fileName;
      console.log(url)
      $http.get(url).then(function(resp){
          console.log(resp)
          vm.getTheFile(resp)
        })

    }
   vm.getTheFile = function(res){
      var files = res.data;
      console.log(files)
      var lineCounter = files.split(/\r\n|\n/);
      if(lineCounter.length == 1){
        var lineCounter = files.split("\r");
      }
      var headers = lineCounter[0].split(',');
      var lines = [];
      for ( var i = 0; i < lineCounter.length; i++) {
        // split content based on comma
        var data = lineCounter[i].split(',');
        if (data.length == headers.length) {
          var tarr = [];
          for ( var j = 0; j < headers.length; j++) {
            tarr.push(data[j]);
          }
          lines.push(tarr);
        }
      }
    vm.fileReader = lines;
    }
}]);
