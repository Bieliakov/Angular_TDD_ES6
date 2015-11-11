
import SearchResult from './SearchResult';

export default describe('SearchResult service', () => {

    beforeEach(angular.mock.module('app'));

    it('should have getResults method', () => {
        expect(SearchResult.getResults).toEqual(jasmine.any(Function));
    });

    it('should return and array after invocation', () => {
        var result = SearchResult.getResults();

        expect(result).toEqual(jasmine.any(Array));
    });

});

