


import SearchController from './search.controller'
import SearchDirective from './search.directive';
import './search.result';

export default angular.module('github.search', ['github.api.search'])
    .controller('SearchController', SearchController)
    .directive('githubSearch', SearchDirective);