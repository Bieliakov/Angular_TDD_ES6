export default class SearchController{
    constructor(SearchResult){
        let vm = this;
        //vm.SearchResult = SearchResult;
        console.log(this);
        vm.clickSubmitButton = clickSubmitButton;

        function clickSubmitButton (searchText){
            SearchResult.getResults(searchText).then(function (data) {
                vm.searchResults = data;
            });
        }
    }
};

SearchController.$inject = ['SearchResult'];