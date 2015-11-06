function SearchResult($http) {

    this.getResults = function (query) {
        let baseURL = 'https://api.github.com/search/repositories';

        //console.log('query', query);
        return $http({
            method: 'GET',
            url: baseURL,
            params: {
                q: query
            }
        }).then(
            function successCallback(response) {
                console.log(response)
                return response.data.items;
            },
            function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

    };
} // end 'SearchResult' service

export default SearchResult;