/**
 * @ngdoc service
 * @name FacebookService
 * @description
 * # Service to retrieve facebook messages
 */
smdc.factory('FacebookService',['$resource', 'restAPI', function($resource, restAPI) {
	return {
		posts: $resource(restAPI.url+'facebook/page/posts'),
		insights: $resource(restAPI.url+'facebook/page/insights')
	};
}]);