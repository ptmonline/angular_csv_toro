describe('Services: DataService', function(){
  beforeEach(module('toroTest'));

  var DataService;
  var $httpBackend;

  beforeEach(inject(function(_DataService_, _$httpBackend_){
    DataService = _DataService_;
    $httpBackend = _$httpBackend_;
  }))

  it("Should GET data from csv file", function(){

    $httpBackend.expectGET('./uploads/data-example-1.csv').respond('Product Title,SKU,Parent SKU,Price,Color,Description');

    var response = DataService.getData('./uploads/data-example-1.csv');
    $httpBackend.flush();

    expect(response).not.toBe(null);

  })

  afterEach(function(){
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  })

})
describe('mainController', function(){
    beforeEach(module('toroTest'))

    var scope, mainController, q, deferred, response;

    beforeEach(function(){
      response = {"items": [
        {"title" : "iPhone 6S Oro", "email": "iphonemail@wallapop.com", "price": "740"},
        {"title" : "Polaroid 635", "email": "cameramail@wallapop.com", "price": "50"}
      ]}
      JSONService = {
        getData: function(){
          deferred = q.defer();
          return deferred.promise
        }
      }
    })

    beforeEach(inject(function($controller, $rootScope, $q){
      scope = $rootScope.$new();
      q = $q;
      mainController = $controller('mainController',{
        $scope : scope,
				DataService: JSONService
      })
  }))

    it("should be registered", function() {
      expect(module).not.toEqual(null);
    });
		it("should say hello", function(){
			expect(mainController.hello).toBe('TORO Angular Test')
		})
		it("should return true", function(){
			expect(typeof mainController.submit).toEqual('function');
		})
		it("should return true", function(){
			expect(typeof mainController.upload).toEqual('function');
		})
    // it('should return data', function(){
    //   deferred.resolve(response);
    //   scope.$root.$digest();
    //   expect(scope.items[0].title).not.toBeUndefined();
    //   expect(scope.items[0].title).toBe('iPhone 6S Oro');
    // })
});
