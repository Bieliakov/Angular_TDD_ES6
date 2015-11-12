
import SearchController from './search.controller';

let searchController;

export default xdescribe('SearchController controller', () => {

    beforeEach(function(){
        searchController = new SearchController();
        console.log('searchController', searchController)
    });

    it('should have clickSubmitButton function', () => {
        expect(searchController.clickSubmitButton).toEqual(jasmine.any(Function));
    });

});

