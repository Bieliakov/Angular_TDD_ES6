class SearchController{
    constructor(SearchResult){
        let vm = this;
        vm.clickSubmitButton = clickSubmitButton;

        function clickSubmitButton (searchText){
            SearchResult.getResults(searchText).then( (data) => {
                vm.searchResults = data;
            });
        }
    }
};

SearchController.$inject = ['SearchResult'];

export default SearchController;