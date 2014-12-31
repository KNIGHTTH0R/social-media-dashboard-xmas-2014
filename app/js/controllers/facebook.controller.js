/**
 * @ngdoc function
 * @name smdc.controller:FacebookCtrl
 * @description
 * Facebook controller
 */

smdc.controller('FacebookCtrl',['$scope', 'FacebookService', function($scope, FacebookService) {

	/**
	 * [posts description]
	 * @type {Array}
	 */
	$scope.posts = [];

	/**
	 * Returns 5 latest posts from Facebook and converts created_time
	 */
	FacebookService.posts.get(function(posts) {
		// $scope.posts = posts.data;
		angular.forEach(posts.data, function(posts) {
			posts.created_time = moment(posts.created_time).fromNow();
			$scope.posts.push(posts);
		});
	});
		
	/**
	 * Returns Facebook insights
	 */
	FacebookService.insights.get(function(insights) {
		$scope.insights = insights;
	});
	
}]);