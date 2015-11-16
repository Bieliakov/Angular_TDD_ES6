
class SearchModel{
    constructor($http){
        let apiUrl = 'https://api.github.com' + '/search';

        return {
            getResults: getResults
        };

        function getResults (query) {
            return $http({
                method: 'GET',
                url: `${apiUrl}/repositories`,
                params: { q: query }
            })  .then(response => response.data.items)
                .catch(response => new Error(response));
        }
    }

    static factory($http) {
        return new SearchModel($http);
    }
}

SearchModel.factory.$inject = ['$http'];

angular.module('github.api.search', [])
    .factory('SearchResult', SearchModel.factory);
