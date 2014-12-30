/**
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
}]);