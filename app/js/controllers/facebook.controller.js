/**
 * @ngdoc function
 * @name smdc.controller:FacebookCtrl
 * @description
 * Facebook controller
 */

smdc.controller('FacebookCtrl',['$scope', 'FacebookService', function($scope, FacebookService) {

	/**
	 * Returns 5 latest posts from Facebook
	 */
	FacebookService.posts.get(function(posts) {
		$scope.posts = posts.data;
	});
		
	/**
	 * Returns Facebook insights
	 */
	FacebookService.insights.get(function(insights) {
		$scope.insights = insights;
	});
	
}]);