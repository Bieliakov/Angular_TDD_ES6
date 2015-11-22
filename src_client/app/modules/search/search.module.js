


import SearchController from './search.controller.js'
import SearchDirective from './search.directive.js';
import './search.factory.js';

export default angular.module('github.search', ['github.api.search'])
    .controller('SearchController', SearchController)
    .directive('githubSearch', SearchDirective);