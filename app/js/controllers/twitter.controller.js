/**
 * @ngdoc function
 * @name smdc.controller:TwitterCtrl
 * @description
 * Twitter controller
 */

smdc.controller('TwitterCtrl',['$scope','$http','$sce', 'TwitterService', function($scope, $http,$sce, TwitterService) {

	/**
	 * [tweets description]
	 * @type {Array}
	 */
	$scope.tweets = [];

	/**
	 * Returns Twitter user information (CompetaIT)
	 */
	TwitterService.user.get(function(user) {
		$scope.user = user;
	}, function err() {
		console.log('Could not make a connection to Twitter user Service');
	});

	/**
	 * Returns 5 latest Tweets of the CompetaIT account and converts created_at date
	 */
	TwitterService.tweets.query(function(tweets) {
		angular.forEach(tweets, function(data) {
			data.created_at = moment(data.created_at).fromNow();
			data.text = getHashTags(data.text);
			$scope.tweets.push(data);
		});
	}, function err() {
		console.log('Could not make a connection to Twitter tweet Service');
	});

	var getHashTags = function(str) {
		var matches = str.match(/#[a-z\d]+/ig);
		for(i = 0; i < matches.length; i++) {
			var str = str.replace(matches[i], '<span class="hashtag">' + matches[i] + '</span>');
		}
		return $sce.trustAsHtml(str);
	};

}]);