
import SearchController from './search.controller'
import SearchResult from './search.result';

export default angular.module('GitHub.search', [])
    .controller('SearchController', SearchController)
    .service('SearchResult', SearchResult);