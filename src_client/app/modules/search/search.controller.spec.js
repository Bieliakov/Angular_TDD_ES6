
import SearchController from './search.controller.js';

let searchController;
let query = 'some query';


describe('SearchController controller', () => {

    let sut;

    let SearchResultMock = {
        getResults: (query) => {
            let response = {};
            response.data = {
                total_count: 303,
                incomplete_results: false,
                items: [{}, {}, {}]
            };
            let promise = new Promise(function(resolve, reject) { resolve(response) });
            return promise.then((response) => response.data.items);

        }
    };

    beforeEach(() => {
        sut = new SearchController(SearchResultMock);
        //console.log('searchController', searchController)
    });

    it('should have clickSubmitButton function', () => {
        expect(sut.clickSubmitButton).toEqual(jasmine.any(Function));
    });

    it('should not have searchResults property', () => {
        expect(sut.searchResults).toBeUndefined();
    });

    describe('clickSubmitButton method after invokation', () => {


        it('should search with appopriate query', () => {
            sut.clickSubmitButton(query);
            console.log(sut.searchResults);
            //expect(sut.searchResults.length).to.be.equal(3);
        })
    })

});

