
class SearchResult{
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
            }).then(
                response => response.data.items,
                response => new Error(response)
            );
        }
    }

    static factory($http) {
        return new SearchResult($http);
    }
}

SearchResult.factory.$inject = ['$http'];

angular.module('github.api.search', [])
    .factory('SearchResult', SearchResult.factory);
