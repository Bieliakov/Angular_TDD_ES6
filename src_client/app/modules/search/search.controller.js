class SearchController{
    constructor(SearchResult){
        let vm = this;
        vm.clickSubmitButton = clickSubmitButton;

        function clickSubmitButton (searchText){
            SearchResult.getResults(searchText).then( (data) => {
                vm.searchResults = data;
                return vm.searchResults;
            });
        }
    }
}

SearchController.$inject = ['SearchResult'];

export default SearchController;