export default class SearchResult{
    constructor($http){
        let baseURL = 'https://api.github.com/search/repositories';
        this.getResults = function (query) {
            //console.log('query', query);
            return $http({
                method: 'GET',
                url: baseURL,
                params: {
                    q: query
                }
            }).then(
                response => response.data.items
                ,
                function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });

        };
    }
} // end 'SearchResult' service
