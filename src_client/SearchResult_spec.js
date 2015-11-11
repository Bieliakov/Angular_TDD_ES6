
import SearchResult from './SearchResult';

let searchResult;
var $httpBackend;
let result;
let baseURL = 'some/false/url';
describe('SearchResult service', () => {

    //beforeEach(angular.mock.module('app'));

    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
    }));


    beforeEach(
        function(){
            searchResult = new SearchResult($httpBackend);
        }
    );

    it('should have getResults method', () => {
        expect(searchResult.getResults).toEqual(jasmine.any(Function));
    });

    describe('getResults method', () => {

        beforeEach(function(){
            console.log('$httpBackend', $httpBackend);
            //console.log('angular', angular);
            console.log('searchResult', searchResult);
            //result = searchResult.getResults();
        });

        //afterEach(function() {
        //    $httpBackend.verifyNoOutstandingExpectation();
        //    $httpBackend.verifyNoOutstandingRequest();
        //});

        xit('should be invoked with proper url', () => {
            $httpBackend.expectGET(baseURL);
            result = searchResult.getResults();
            $httpBackend.flush();
        });


        it('should return and array after invocation', () => {
            //expect(result).toEqual(jasmine.any(Array));
        });

    });

});

