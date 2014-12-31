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
			posts.created_time = parseFacebookDate(posts.created_time);
			$scope.posts.push(posts);
		});
	});
		
	/**
	 * Returns Facebook insights
	 */
	FacebookService.insights.get(function(insights) {
		$scope.insights = insights;
	});
	
	/**
	 * Converts Facebook created_time to a readable date
	 * @param  {string} time
	 * @return {string}
	 */
	var parseFacebookDate = function(time){
		var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
		    diff = (((new Date()).getTime() - date.getTime()) / 1000),
		    day_diff = Math.floor(diff / 86400);
		
		if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
		    return;

		return day_diff == 0 && (
		        diff < 60 && "just now" ||
		        diff < 120 && "1 minute ago" ||
		        diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
		        diff < 7200 && "1 hour ago" ||
		        diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
		    day_diff == 1 && "Yesterday" ||
		    day_diff < 7 && day_diff + " days ago" ||
		    day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
	}

}]);