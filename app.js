angular.module('toroTest', [])
  .controller('mainController', function($scope, $http){
    $scope.hello = 'TORO Angular Test';
    var theNameOftheFile = '';
    $scope.checkName = function(file){
      console.log(file.files)
      theNameOftheFile = file.files[0].name
    }
    $scope.getFile = function(){
      console.log('trigered')
      $('#uploadForm').submit(function() {
   		 //  $("#status").empty().text("File is uploading...");
        $(this).ajaxSubmit({
          error: function(xhr) {
            status('Error: ' + xhr.status);
          },
          success: function(response) {
   					console.log(response)
            theFile();
   				// 	$("#status").empty().text(response);
          }
   	    });
        return false;
     });
      function theFile(){
        $http.get('./uploads/' + theNameOftheFile).then(function(resp){
          console.log(resp)
          $scope.getTheFile(resp)
        })
      }

    }
    $scope.getTheFile = function(res){
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
    $scope.fileReader = lines;
    }
  })
