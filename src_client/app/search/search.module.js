
import SearchController from './search.controller'
import SearchDirective from './search.directive';
import SearchResult from './search.result';

export default angular.module('github.search', [])
    .controller('SearchController', SearchController)
    .directive('githubSearch', SearchDirective)
    .service('SearchResult', SearchResult);