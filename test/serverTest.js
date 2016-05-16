var should = require('should');
var supertest = require('supertest');
var server = supertest.agent('http://localhost:3000');

describe('File upload test cases',function(){
	it('should upload file',function(done){
		server
		.post('/upload')
		.field('filename', 'test file')
		.attach('file', 'test/data-example-1.csv')
		.expect(200)
		.end(function(err,res){
			res.status.should.equal(200)
			done();
		});
	});
});
