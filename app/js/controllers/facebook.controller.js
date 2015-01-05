/**
 * @ngdoc function
 * @name smdc.controller:FacebookCtrl
 * @description
 * Facebook controller
 */

smdc.controller('FacebookCtrl',['$scope', 'FacebookService','$sce', function($scope, FacebookService, $sce) {

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
			posts.message = getHashTags(posts.message);
			$scope.posts.push(posts);
		});
	},function err() {
		console.log('Could not make a connection to Facebook posts Service');
	});
		
	/**
	 * Returns Facebook insights
	 */
	FacebookService.insights.get(function(insights) {
		$scope.insights = insights;
	},function err() {
		console.log('Could not make a connection to Facebook insights Service');
	});
	
	/**
	 * Gets all hashtags in the tweets and adds the class "Hashtag" to it
	 * @param  {string} str 
	 * @return {string} 
	 */
	var getHashTags = function(str) {
		var matches = str.match(/#[a-z\d]+/ig);

		if(!matches) {
			return $sce.trustAsHtml(str);
		} else {
			for(i = 0; i < matches.length; i++) {
				var str = str.replace(matches[i], '<span class="hashtag">' + matches[i] + '</span>');
			}
			return $sce.trustAsHtml(str);
		}
	};

}]);