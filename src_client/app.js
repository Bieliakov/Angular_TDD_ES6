import angular from 'angular';

import HomeController from './HomeController'
import SearchResult from './SearchResult';

//import MainSearch from './mainSearch';

export default angular.module('app', [])
    .controller('HomeController', HomeController)
    .service('SearchResult', SearchResult);


//let mainSearch = new MainSearch();
//console.log('mainSearch', mainSearch);
//document.body.appendChild(mainSearch.elem);


