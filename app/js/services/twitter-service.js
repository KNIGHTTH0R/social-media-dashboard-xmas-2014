/**
 * @ngdoc service
 * @name TwitterService
 * @description
 * # Service to retrieve twitter messages
 */
smdc.factory('TwitterService',['$resource', 'restAPI', function($resource, restAPI) {
	return {
			user: $resource(restAPI.temp+'twitter.user.json'),
			tweets: $resource(restAPI.temp+'twitter.status.json')
	};
}]);