/**
 * @ngdoc function
 * @name smdc.controller:TwitterCtrl
 * @description
 * Twitter controller
 */

smdc.controller('TwitterCtrl',['$scope','$http', 'TwitterService', function($scope, $http, TwitterService) {

	/**
	 * Returns Twitter user information (CompetaIT)
	 */
	TwitterService.user.get(function(user) {
		$scope.user = user;
	});

	/**
	 * Returns 5 latest Tweets of the CompetaIT account
	 */
	TwitterService.tweets.query(function(tweets) {
		$scope.tweets = tweets;
	});

}]);