var app = angular.module('toroTest', []);

app.controller('MainCtrl', function($scope) {
  $scope.name = 'World';
  $scope.displayContent = function(fileContent){
    var files = fileContent.files;

    if (files.length) {
      var r = new FileReader();
      r.onload = function(e) {
          var contents = e.target.result;
          var lineCounter = contents.split(/\r\n|\n/);
          if(lineCounter.length == 1){
            var lineCounter = contents.split("\r");
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
          $scope.$apply(function () {
            $scope.fileReader = lines;
          });
      };

      r.readAsText(files[0]);
    }
  }
});
