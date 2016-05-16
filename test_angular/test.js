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
    var url = './uploads/data-example-1.csv'
    beforeEach(function(){
      response = 'Product Title,SKU,Parent SKU,Price,Color,Description'
      DataService = {
        getData: function(url){
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
				DataService: DataService
      })
  }))

    it("should be registered", function() {
      expect(module).not.toEqual(null);
    });
		it("should say hello", function(){
			expect(mainController.init).toBe('TORO Angular Test')
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
    //   expect(scope).not.toBeUndefined();
    //   expect(scope).toBe('Product Title,SKU,Parent SKU,Price,Color,Description');
    // })
});
