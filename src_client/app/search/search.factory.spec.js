
import SearchResult from './search.factory.js';

describe('SearchResult service', () => {

    //beforeEach(angular.mock.module('app'));

    // should use $q instead of $httpBackend (by Illia)

    let searchResult;
    let $httpBackend;

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

        let result;
        let baseURL = 'https://api.github.com/search/repositories';
        let fakeRepo = {
            "id": 45656,
            "name": "vasiliy",
            "full_name": "vasiliyPupkin/vasiliy",
            "html_url": "https://github.com/vasiliyPupkin/vasiliy",
            "description": "Some string",
            "fork": false,
            "url": "https://api.github.com/repos/vasiliyPupkin/vasiliy"
        };
        let query = fakeRepo.name;

        beforeEach(
            function() {
                $httpBackend.expect('GET', baseURL + '?q=' + query)
                    .respond( { items: [ fakeRepo ] });
                searchResult = new SearchResult($httpBackend);

                //result = searchResult.getResults(query);

                //console.log('result', result);
                //$httpBackend.flush();

            }
        );

        it('should return and array after invocation', () => {
            searchResult.getResults(query).then(
                function(response)  {
                    console.log('response', response);
                    expect(response).toEqual(jasmine.any(Array));
                }
            );
        });

        xit('should return and array with length equals to 1', () => {
            searchResult.getResults(query).then(
                function(response)  {
                    expect(response).toEqual(jasmine.any(Array));
                }
            );
        });

        xit('should be invoked with proper url', () => {

        });
    });
});

