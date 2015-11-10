import angular from 'angular';
import SearchResult from './SearchResult';

import MainSearch from './mainSearch';

let mainSearch = new MainSearch();
console.log('mainSearch', mainSearch);
document.body.appendChild(mainSearch.elem);


angular.module('app', [])
    .controller('homeController', homeController)
    .service('SearchResult', SearchResult);

function homeController(SearchResult) {
    let vm = this;
    console.log(this);
    vm.clickSubmitButton = function (searchText){
       SearchResult.getResults(searchText).then(function (data) {
           vm.searchResults = data;
       });
    }
}





