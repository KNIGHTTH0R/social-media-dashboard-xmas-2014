/**
 * @ngdoc service
 * @name TwitterService
 * @description
 * # Service to retrieve twitter messages
 */
smdc.factory('TwitterService',['$resource', 'restAPI', function($resource, restAPI) {
	return {
		posts: $resource(restAPI.url+'facebook/page/posts'),
		insights: $resource(restAPI.url+'facebook/page/insights')
	};
}]);