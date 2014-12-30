/**
 * @ngdoc overview
 * @name smdc
 * @description
 * # Social media dashboard Competa
 *
 * Main module of the application.
 */

var smdc = angular.module('smdc',
	['ngRoute',
	 'ngResource'
	]);
	
	smdc.constant('restAPI', {
		'url': 'http://smdc.api/REST.php/'
	});

	smdc.config(['$routeProvider', function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'views/home.html',
			}).
			otherwise({
				redirectTo: '/'
			});
	}]);


;/**
 * @ngdoc function
 * @name smdc.controller:FacebookCtrl
 * @description
 * Facebook controller
 */

smdc.controller('FacebookCtrl',['$scope', 'FacebookService', function($scope, FacebookService) {
	/**
	 * Returns 5 latest posts from Facebook
	 * @type {array}
	 */
	$scope.posts = FacebookService.posts.get();

	/**
	 * Returns Facebook insights
	 * @type {array}
	 */
	$scope.insights = FacebookService.insights.get();
}]);;/**
 * @ngdoc function
 * @name smdc.controller:TwitterCtrl
 * @description
 * Twitter controller
 */

smdc.controller('TwitterCtrl',['$scope', 'TwitterService', function($scope, TwitterService) {
	
}]);;/**
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
}]);;/**
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