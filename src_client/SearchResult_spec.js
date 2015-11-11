
import SearchResult from './SearchResult';

let searchResult;

describe('SearchResult service', () => {
    
    beforeEach(
        function(){
            angular.mock.module('app');
            searchResult = new SearchResult();
            //console.log('$http', $http);
            console.log('searchResult', searchResult)
        }
    );

    it('should have getResults method', () => {
        expect(searchResult.getResults).toEqual(jasmine.any(Function));
    });

    xit('should return and array after invocation', () => {
        var result = searchResult.getResults();

        expect(result).toEqual(jasmine.any(Array));
    });

});

