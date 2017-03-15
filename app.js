angular.module('toroTest', ['ngFileUpload'])
  .controller('mainController', ['Upload', 'DataService', function (Upload, DataService) {
    var mctrl = this;
    mctrl.init = 'TORO Angular Test';
    mctrl.submit = function () { //function to call on form submit
      if (mctrl.upload_form.file.$valid && mctrl.file) { //check if from is valid
        mctrl.upload(mctrl.file); //call upload function
      }
    }
    mctrl.upload = function (file) {
      Upload.upload({
        url: 'http://localhost:3000/upload', //webAPI exposed to upload the file
        data: { file: file }
      }).then(function (resp) { //upload function returns a promise
        getFile(resp.config.data.file.name)
      });
    };
    function getFile(fileName) { //call to uploads folder
      var url = "/uploads/" + fileName;
      DataService.getData(url).then(function (resp) {
        mctrl.getTheFile(resp)
      })
    }
    mctrl.getTheFile = function (res) { //display content
      var files = res;
      var lineCounter = files.split(/\r\n|\n/);
      console.log(lineCounter)
      console.log(lineCounter)
      if (lineCounter.length == 1) { // split first file for headers
        var lineCounter = files.split("\r");
      }
      var headers = lineCounter[0].split(',');


      function getinfoFile(lineCounter) {
        var lines = [];
        for (var i = 1; i <= lineCounter.length - 1; i++) { // split content based on comma
          var data = lineCounter[i].split(',');
          lines.push(lineCounter[i].split(','));
        }
        return lines;
      }

      function getHeaders(headers) {
        var theHeaders = [];
        for (var i = 0; i < headers.length; i++) { // split content based on comma
          var data = headers[i].split(',');
          theHeaders.push(headers[i].split(',')[0]);
        }
        return theHeaders;
      }
      mctrl.headers = getHeaders(headers);
      mctrl.infocenter = getinfoFile(lineCounter);
      mctrl.fileReader = lines;
    }
  }])
  .factory('DataService', function ($http) {
    return {
      getData: function (url) {
        return $http.get(url)
          .then(function (response) {
            return response.data
          })
      }
    }
  })
